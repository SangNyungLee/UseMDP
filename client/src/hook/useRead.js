import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { plannerListActions } from "../store/plannerList";
import { calendarActions } from "../store/calendar";
import { validatePlannerData, validatePlannerListData, validateUnspecifiedPlannerData, validateUnspecifiedPlannerListData } from "../utils/DataValidate";
import { readPlanner, readPlannerList } from "../utils/DataAxiosParsing";

export default function useRead(target){
    const [ readData, setReadData ] = useState();

    const dispatch = useDispatch();

    useEffect(()=>{
        if(readData){
            const data = JSON.parse(readData)
            console.log("data",data);
            if (validatePlannerData(data)) {
                // cards = [ [] , [] , [] ] 형태
                console.log("planner")
                readPlannerData(data,true);
            } else if (validateUnspecifiedPlannerData(data)) {
                // cards = [] 형태
                console.log("planner2")
                readPlannerData(data,false);
            } else if (validatePlannerListData(data)) {
                // cards = [ [] , [] , [] ] 형태
                console.log("plannerList")
                readPlannerListData(data,true);
            } else if (validateUnspecifiedPlannerListData(data)) {
                // cards = [] 형태
                console.log("unspecified plannerList")
                readPlannerListData(data,false);
            } else {
                console.log("error")
            }
            setReadData();
        }
    },[readData])

    const readPlannerData = async (data,specified) => {
        const planner = await readPlanner(data,specified);
        const { plannerId } = planner
        dispatch(plannerListActions.addPlanner(planner))
        dispatch(calendarActions.setSelect({
            target,
            value: [plannerId]
        }))
    }

    const readPlannerListData = async (data,specified) => {
        const plannerList = await readPlannerList(data,specified);
        const plannerId = plannerList[0].plannerId
        dispatch(plannerListActions.addPlannerList(plannerList))
        dispatch(calendarActions.setSelect({
            target,
            value: [plannerId]
        }))
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        readFileContents(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    const readFileContents = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContents = e.target.result;
            setReadData(fileContents)
        };
        reader.readAsText(file);
    };

    const readerRegister = {
        onDrop: handleDrop,
        onDragOver: handleDragOver,
    }

    return readerRegister
}
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { plannerListActions } from "../store/plannerList";
import { calendarActions } from "../store/calendar";
import { validatePlannerData, validatePlannerListData, validateUnspecifiedPlannerData, validateUnspecifiedPlannerListData } from "../utils/DataValidate";
import { plannerCardStatusDevide, plannerListCardStatusDevide, readSpecifiedPlanner, readSpecifiedPlannerList, readUnspecifiedPlanner, readUnspecifiedPlannerList } from "../utils/DataParsing";

export default function useRead(page){
    const [ readData, setReadData ] = useState();

    const dispatch = useDispatch();

    useEffect(()=>{
        if(readData){
            const data = JSON.parse(readData)
            console.log("data",data);
            if (validatePlannerData(data)) {
                // cards = [ [] , [] , [] ] 형태
                console.log("planner")
                readSpecifiedPlannerData(data)
            } else if (validateUnspecifiedPlannerData(data)) {
                // cards = [] 형태
                console.log("planner2")
                readUnspecifiedPlannerData(data);
            } else if (validatePlannerListData(data)) {
                // cards = [ [] , [] , [] ] 형태
                console.log("plannerList")
                readSpecifiedPlannerListData(data);
            } else if (validateUnspecifiedPlannerListData(data)) {
                // cards = [] 형태
                console.log("unspecified plannerList")
                readUnspecifiedPlannerListData(data);
            } else {
                console.log("error")
            }
            setReadData();
        }
    },[readData])

    const readSpecifiedPlannerData = async (data) => {
        const planner = await readSpecifiedPlanner(data);
        console.log("readSpecifiedPlanner",planner);
        const { plannerId } = planner
        dispatch(plannerListActions.addPlanner(planner))
        dispatch(calendarActions.setHome([plannerId]))
    }

    const readUnspecifiedPlannerData = async (data) => {
        const planner = await readUnspecifiedPlanner(data);
        console.log("readUnspecifiedPlanner",planner);
        const { plannerId } = planner
        dispatch(plannerListActions.addPlanner(planner))
        dispatch(calendarActions.setHome([plannerId]))
    }

    const readSpecifiedPlannerListData = async (data) => {
        const plannerList = await readSpecifiedPlannerList(data);
        const newPlannerList = plannerListCardStatusDevide(plannerList)
        dispatch(plannerListActions.addPlannerList(newPlannerList))
    }

    const readUnspecifiedPlannerListData = async (data) => {
        const plannerList = await readUnspecifiedPlannerList(data);
        const newPlannerList = plannerListCardStatusDevide(plannerList)
        dispatch(plannerListActions.addPlannerList(newPlannerList))
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
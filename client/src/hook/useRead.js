import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { plannerListActions } from "../store/plannerList";
import { calendarActions } from "../store/calendar";
import { validateUnspecifiedPlannerData } from "../utils/DataValidate";
import { readPlanner, readPlannerList } from "../utils/DataAxiosParsing";
import { HOME } from "../constant/constant";
import { requestFail } from "../component/etc/SweetModal";
import { useSelector } from "react-redux";

export default function useRead(target){
    const plannerList = useSelector( state => state.plannerList);

    const [ readData, setReadData ] = useState();

    const dispatch = useDispatch();

    // useEffect(()=>{
    //     if(readData){
    //         const data = JSON.parse(readData)
    //         console.log("data",data);
    //         if (validatePlannerData(data)) {
    //             // cards = [ [] , [] , [] ] 형태
    //             console.log("planner")
    //             readPlannerData(data,true);
    //         } else if (validateUnspecifiedPlannerData(data)) {
    //             // cards = [] 형태
    //             console.log("planner2")
    //             readPlannerData(data,false);
    //         } else if (validatePlannerListData(data)) {
    //             // cards = [ [] , [] , [] ] 형태
    //             console.log("plannerList")
    //             readPlannerListData(data,true);
    //         } else if (validateUnspecifiedPlannerListData(data)) {
    //             // cards = [] 형태
    //             console.log("unspecified plannerList")
    //             readPlannerListData(data,false);
    //         } else {
    //             console.log("error")
    //         }
    //         setReadData();
    //     }
    // },[readData])

    useEffect(()=>{
        if(readData){
            const data = JSON.parse(readData)
            console.log("data",data);
            if (validateUnspecifiedPlannerData(data)) {
                readPlannerData(data,false);
            } else {
                requestFail("플래너 데이터 읽기", "올바르지 않은 형식")
            }
            setReadData();
        }
    },[readData])

    const readPlannerData = async (data,specified) => {
        const result = await readPlanner(data,specified);
        if(result){
            const { plannerId } = result
            dispatch(plannerListActions.addPlanner(result))
            if(plannerList.length === 0){
                dispatch(calendarActions.setAll([plannerId]))
            }
        } else {
            requestFail("데이터")
        }
    }

    const readPlannerListData = async (data,specified) => {
        const plannerList = await readPlannerList(data,specified);
        if(plannerList){
            const plannerId = plannerList[0].plannerId
            dispatch(plannerListActions.addPlannerList(plannerList))
            if(target === HOME){
                dispatch(calendarActions.setSelect({
                    target,
                    value: [plannerId]
                }))
            }
        } else {
            requestFail("데이터")
        }
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
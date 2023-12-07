import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { plannerListActions } from "../store/plannerList";
import { calendarActions } from "../store/calendar";
import { validateSpecifiedPlannerData, validateUnspecifiedPlannerData } from "../utils/DataValidate";
import { readPlanner } from "../utils/DataAxiosParsing";
import { requestFail } from "../component/etc/SweetModal";
import { useSelector } from "react-redux";

export default function useRead(){
    const plannerList = useSelector( state => state.plannerList);

    const [ readData, setReadData ] = useState();

    const dispatch = useDispatch();

    useEffect(()=>{
        if(readData){
            const data = JSON.parse(readData)
            if (validateUnspecifiedPlannerData(data)) {
                readPlannerData(data,false);
            } else if (validateSpecifiedPlannerData(data)){
                readPlannerData(data,true)
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
            return;
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
		if (!file) {
			return;
		}

		const fileName = file.name.toLowerCase();

		if (!fileName.endsWith('.json')) {
			requestFail("데이터","올바른 형식의 파일이 아닙니다")
			setReadData();
            return;
		}

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
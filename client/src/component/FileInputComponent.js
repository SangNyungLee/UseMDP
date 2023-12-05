import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { validateUnspecifiedPlannerData } from '../utils/DataValidate';
import { readPlanner } from '../utils/DataAxiosParsing';
import { plannerListActions } from '../store/plannerList';
import { requestFail } from './etc/SweetModal';
import { useSelector } from 'react-redux';
import { calendarActions } from '../store/calendar';

export default function FileInputComponent({ children }) {
    const fileInputRef = useRef();
    const plannerList = useSelector( state => state.plannerList)
    const [ readData, setReadData ] = useState();
    const dispatch = useDispatch();

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

    const handleButtonClick = (e) => {
        e.stopPropagation()
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContents = e.target.result;
            setReadData(fileContents);
        };
        reader.readAsText(event.target.files[0]);
    };

    return (
        <>
            <span onClick={ e => handleButtonClick(e)}>
                {children}
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
            </span>
        </>
    );
}

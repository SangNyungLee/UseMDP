import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import styled from "styled-components"
import { useDispatch } from "react-redux";
import { plannerListActions } from "../../store/plannerList";
import DataReaderModal from "../reader/DataReaderModal";
import PlannerListLi from "./calendar/PlannerListLi";
import useRead from "../../hook/useRead";

const _Container = styled.div`
    background-color: skyblue;
    height: 100vh;
    width: 200px;
`

export default function HomeSideBar(){
    const plannerList = useSelector( state => state.plannerList );
    const [ readData, setReadData ] = useState();
    const dispatch = useDispatch();

    const readerRegister = useRead(setReadData);

    useEffect(()=>{
        if(readData){
            const data = JSON.parse(readData)
            console.log("data",data);
            dispatch(plannerListActions.addPlanner(data))
            setReadData();
        }
    },[readData])

    return(<>
        <_Container {...readerRegister}>
            <ul>
                { plannerList.map((e,id) =>
                    <li key={id}>
                        <PlannerListLi plan={e} firstIndex={id}/>
                    </li>
                )}
            </ul>
            <DataReaderModal setState={setReadData}/>
        </_Container>
    </>)
}
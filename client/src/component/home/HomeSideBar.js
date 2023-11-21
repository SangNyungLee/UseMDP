import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import styled from "styled-components"
import { useDispatch } from "react-redux";
import { plannerListActions } from "../../store/plannerList";
import DataReaderModal from "../reader/DataReaderModal";
import PlannerListLi from "./calendar/PlannerListLi";

const _Container = styled.div`
    background-color: skyblue;
    height: 100vh;
    width: 200px;
`

export default function HomeSideBar(){
    const plannerList = useSelector(state => state.plannerList);
    const [ readData, setReadData ] = useState();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(readData){
            const data = JSON.parse(readData)
            dispatch(plannerListActions.addPlanner(data))
            setReadData();
        }
    },[readData])

    console.log("plannerList",plannerList)


    return(<>
        <_Container>
            <ul>
                { plannerList.map((e,id) =>
                    <li key={id}>
                        <PlannerListLi plan={e}/>
                    </li>
                )}
            </ul>
            <DataReaderModal setState={setReadData}/>
        </_Container>
    </>)
}
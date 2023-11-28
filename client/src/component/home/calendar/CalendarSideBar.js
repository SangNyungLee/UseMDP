import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import styled from "styled-components"
import { useDispatch } from "react-redux";
import { plannerListActions } from "../../../store/plannerList";
import PlannerListLi from "./PlannerListLi";
import useRead from "../../../hook/useRead";
import { plannerCardStatusDevide, plannerListCardStatusDevide, readSpecifiedPlanner, readUnspecifiedPlanner, readUnspecifiedPlannerList, specifyPlanner } from "../../../utils/DataParsing";
import { validatePlannerData, validatePlannerListData, validateUnspecifiedPlannerData, validateUnspecifiedPlannerListData } from "../../../utils/DataValidate";
import { calendarActions } from "../../../store/calendar";

const _Container = styled.div`
    border-radius: 20px;
    background-color: skyblue;
    height: 100vh;
    max-width: 270px;
    min-width: 270px;
    width: 270px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    padding-top: 30px;
    margin: 30px;
    margin-top: 0px;
`

const _PlannerListUl = styled.ul`
    list-style-type: none;
    padding: 5px;
`

export default function CalendarSideBar(){
    const plannerList = useSelector( state => state.plannerList );
    const [ readData, setReadData ] = useState();
    const dispatch = useDispatch();

    const readerRegister = useRead(setReadData);

    useEffect(()=>{
        if(readData){
            const data = JSON.parse(readData)
            console.log("data",data);
            if (validatePlannerData(data)) {
                // cards = [ [] , [] , [] ] 형태
                console.log("planner")
                const planner = readSpecifiedPlanner(data);
                const newPlanner = plannerCardStatusDevide(planner)
                const { plannerId } = newPlanner
                dispatch(plannerListActions.addPlanner(newPlanner))
                dispatch(calendarActions.setHome([plannerId]))
            } else if (validateUnspecifiedPlannerData(data)) {
                // cards = [] 형태
                console.log("planner2")
                const planner = readUnspecifiedPlanner(data);
                const newPlanner = plannerCardStatusDevide(planner);
                const { plannerId } = newPlanner
                dispatch(plannerListActions.addPlanner(newPlanner))
                dispatch(calendarActions.setHome([plannerId]))
            } else if (validatePlannerListData(data)) {
                // cards = [ [] , [] , [] ] 형태
                console.log("plannerList")
                const plannerList = readSpecifiedPlanner(data);
                const newPlannerList = plannerListCardStatusDevide(plannerList);
                dispatch(plannerListActions.addPlannerList(newPlannerList))
            } else if (validateUnspecifiedPlannerListData(data)) {
                // cards = [] 형태
                console.log("unspecified plannerList")
                const plannerList = readUnspecifiedPlannerList(data);
                const newPlannerList = plannerListCardStatusDevide(plannerList)
                dispatch(plannerListActions.addPlannerList(newPlannerList))
            } else {
                console.log("error")
            }
            setReadData();
        }
    },[readData])

    return(<>
        <_Container {...readerRegister}>
            <_PlannerListUl>
                { plannerList.map((planner) =>
                    <PlannerListLi key={planner.plannerId} planner={planner}/>
                )}
            </_PlannerListUl>
        </_Container>
    </>)
}
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import styled from "styled-components"
import { useDispatch } from "react-redux";
import { plannerListActions } from "../../../store/plannerList";
import PlannerListLi from "./PlannerListLi";
import useRead from "../../../hook/useRead";
import { plannerCardStatusDevide, plannerListCardStatusDevide } from "../../../utils/DataParsing";
import { validatePlannerData, validatePlannerListData, validateUnspecifiedPlannerData, validateUnspecifiedPlannerListData } from "../../../utils/DataValidate";
import { calendarActions } from "../../../store/calendar";

const _Container = styled.div`
    background-color: skyblue;
    height: 100vh;
    max-width: 270px;
    min-width: 270px;
    width: 270px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
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
            // Unspecified인 애들은 이런식으로 데이터가 온다길레 추가로 작업한것..
            // 혹시나 형태가 달라지면 이거도 수정해야함
            if (validatePlannerData(data)) {
                // cards = [ [] , [] , [] ] 형태
                console.log("planner")
                dispatch(plannerListActions.addPlanner(data))
            } else if (validateUnspecifiedPlannerData(data)) {
                // cards = [] 형태
                console.log("planner2")
                const specifiedPlanner = plannerCardStatusDevide(data);
                specifiedPlanner.title = "default title"; // 없는 데이터 셋이길레 추가
                const totalPlannerId = plannerList.reduce((sum, planner) => sum + planner.plannerId, 0);
                console.log("total planner",totalPlannerId)
                specifiedPlanner.plannerId = totalPlannerId + 1 // 마찬가지로 없어서 추가하는데 곂치지 않도록
                dispatch(plannerListActions.addPlanner(specifiedPlanner))
                dispatch(calendarActions.setHome([totalPlannerId + 1]))
            } else if (validatePlannerListData(data)) {
                // cards = [ [] , [] , [] ] 형태
                console.log("plannerList")
                dispatch(plannerListActions.addPlannerList(data))
            } else if (validateUnspecifiedPlannerListData(data)) {
                // cards = [] 형태
                console.log("unspecified plannerList")
                const specifiedPlannerList = plannerListCardStatusDevide(data)
                dispatch(plannerListActions.addPlannerList(specifiedPlannerList))
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
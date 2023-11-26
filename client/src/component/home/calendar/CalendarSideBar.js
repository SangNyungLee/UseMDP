import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import styled from "styled-components"
import { useDispatch } from "react-redux";
import { plannerListActions } from "../../../store/plannerList";
import DataReaderModal from "../../reader/DataReaderModal";
import PlannerListLi from "./PlannerListLi";
import useRead from "../../../hook/useRead";
import { plannerCardStatusDevide, plannerListCardStatusDevide } from "../../../utils/DataParsing";
import { validatePlannerData, validatePlannerListData, validateUnspecifiedPlannerData, validateUnspecifiedPlannerListData } from "../../../utils/DataValidate";

const _Container = styled.div`
    background-color: skyblue;
    height: 100vh;
    width: 200px;
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
                dispatch(plannerListActions.addPlanner(specifiedPlanner))
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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { plannerListActions } from "../../../store/plannerList";
import PlannerListLi from "./PlannerListLi";
import useRead from "../../../hook/useRead";
import {
  plannerCardStatusDevide,
  plannerListCardStatusDevide,
  readSpecifiedPlanner,
  readUnspecifiedPlanner,
  readUnspecifiedPlannerList,
  specifyPlanner,
} from "../../../utils/DataParsing";
import {
  validatePlannerData,
  validatePlannerListData,
  validateUnspecifiedPlannerData,
  validateUnspecifiedPlannerListData,
} from "../../../utils/DataValidate";
import { calendarActions } from "../../../store/calendar";
import { HOME } from "../../../constant/constant";

const _Container = styled.div`
  border-radius: 5px;
  background-color: whitesmoke;
  height: 80vh;
  width: 240px;
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: hidden;
  text-overflow: ellipsis;
  padding-top: 30px;
  margin: 0px 30px;
`;

const _PlannerListUl = styled.ul`
  list-style-type: none;
  padding: 5px;
`;

const _Flex = styled.div`
  display: flex;
`;

const _Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
`;

export default function CalendarSideBar() {
  const plannerList = useSelector((state) => state.plannerList);

  const readerRegister = useRead(HOME);

  return (
    <>
      <_Container {...readerRegister}>
        <_Title>Planner List</_Title>
        <_PlannerListUl>
          {plannerList.map((planner) => (
            <PlannerListLi key={planner.plannerId} planner={planner} />
          ))}
        </_PlannerListUl>
      </_Container>
    </>
  );
}

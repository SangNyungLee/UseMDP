import { useState } from "react";
import CardListLi from "./CardListLi";
import { useDispatch } from "react-redux";
import { calendarActions } from "../../../store/calendar";
import { plannerListActions } from "../../../store/plannerList";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { darken } from "polished";
import { deleteMyPlanner } from "../../../utils/DataAxios";

const _Container = styled.div`
  width: 146px;
  height: 35px;
  background-color: aqua;
  border-radius: 2px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;

  @keyframes dropdown {
    0% {
      transform: translateY(-15%);
    }
    100% {
      transform: translateY(0);
    }
  }

  animation: dropdown 0.4s ease;

  &:hover {
    cursor: pointer;
  }
`;

const _PlannerTitle = styled.div`
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-left: 10px;
  padding: 5px;
`;

export default function CalendarSelectList({ planner }) {
  const { home } = useSelector((state) => state.calendar);
  const plannerList = useSelector((state) => state.plannerList);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { cards, plannerId, title } = planner;

  const handleClick = (e) => {
    e.stopPropagation();
    setVisible((prev) => !prev);
    dispatch(calendarActions.setHome([plannerId]));
  };

  return (
    <>
      <_Container onClick={(e) => handleClick(e)}>
        <_PlannerTitle>{title}</_PlannerTitle>
      </_Container>
    </>
  );
}

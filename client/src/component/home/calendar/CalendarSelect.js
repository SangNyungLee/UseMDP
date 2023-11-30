import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { plannerListActions } from "../../../store/plannerList";
import PlannerListLi from "./PlannerListLi";
import useRead from "../../../hook/useRead";
import CalendarSelectList from "./CalendarSelectList";

const _SelectContainer = styled.div`
  background-color: aliceblue;
  width: 146px;
  height: 40px;
  border-radius: 2px;
  display: flex;
  align-items: center;
`;

const _SelectArrow = styled.div`
  width: fit-content;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const _Flex = styled.div`
  display: flex;
  align-content: center;
  flex-direction: column;
  height: fit-content;
  position: fixed;
  z-index: 10;
`;

const _Container = styled.div`
  width: 146px;
  overflow-y: hidden;
  background-color: black;
  height: 150px;
  border-radius: 2px;
`;

export default function CalendarSelect() {
  const [isClick, setIsClick] = useState("false");
  const plannerList = useSelector((state) => state.plannerList);

  const selectClick = () => {
    setIsClick(!isClick);
  };

  return (
    <_Flex>
      <_SelectContainer>
        {isClick ? (
          <_SelectArrow onClick={(e) => selectClick(e)}>{"▼"}</_SelectArrow>
        ) : (
          <_SelectArrow onClick={(e) => selectClick(e)}>{"▶"}</_SelectArrow>
        )}
      </_SelectContainer>
      {isClick ? (
        <_Container>
          {plannerList.map((planner) => (
            <CalendarSelectList key={planner.plannerId} planner={planner} />
          ))}
        </_Container>
      ) : (
        <></>
      )}
    </_Flex>
  );
}

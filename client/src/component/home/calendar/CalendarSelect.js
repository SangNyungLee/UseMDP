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
  margin-top: -10px;

  @media screen and (min-width: 1300px) {
    & {
      display: none;
    }
  }
`;

const _Container = styled.div`
  width: 146px;
  overflow-y: hidden;
  background-color: white;
  height: 150px;
  border-radius: 2px;
`;

const _Title = styled.div`
  margin-left: 10px;
  text-overflow: ellipsis;
`;

export default function CalendarSelect() {
  const [isClick, setIsClick] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const plannerList = useSelector((state) => state.plannerList);
  const [isTitle, setIsTitle] = useState("");

  const selectClickDrop = () => {
    setIsClick(true);
    setIsVisible(true);
  };

  const selectClick = () => {
    setIsClick(false);
    setIsVisible(false);
  };

  const plannerTitleChange = (title, visible, click) => {
    setIsTitle(title);
    setIsVisible(visible);
    setIsClick(click);
  };

  // const plannerTitleClick = (value) => {
  //   setIsVisible(value);
  // };

  return (
    <_Flex>
      <_SelectContainer>
        {isClick ? (
          <_SelectArrow onClick={(e) => selectClick(e)}>
            <div>{"▼"}</div>
          </_SelectArrow>
        ) : (
          <_SelectArrow onClick={(e) => selectClickDrop(e)}>
            <div>{"▶"}</div>
          </_SelectArrow>
        )}
        <_Title>{isTitle}</_Title>
      </_SelectContainer>
      {isVisible ? (
        <_Container>
          {plannerList.map((planner) => (
            <CalendarSelectList
              key={planner.plannerId}
              planner={planner}
              onTitleChange={plannerTitleChange}
            />
          ))}
        </_Container>
      ) : (
        <></>
      )}
    </_Flex>
  );
}

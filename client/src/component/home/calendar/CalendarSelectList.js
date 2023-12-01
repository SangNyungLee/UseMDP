import { useState } from "react";
import CardListLi from "./CardListLi";
import { useDispatch } from "react-redux";
import { calendarActions } from "../../../store/calendar";
import { plannerListActions } from "../../../store/plannerList";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { darken } from "polished";
import { deleteMyPlanner } from "../../../utils/DataAxios";
import CardStatusSelectList from "./CardStatusSelectList";

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

const _PlannerContainer = styled.div`
  width: 146px;
  background-color: none;
  border-radius: 2px;
  display: flex;
  align-items: center;
  flex-direction: column;
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

const _CardsContainer = styled.div`
  display: flex;
  width: 146px;
  overflow-y: hidden;
  background-color: aliceblue;
  border-radius: 2px;
  flex-direction: column;
  margin-left: 15px;
`;

export default function CalendarSelectList({
  planner,
  setIsVisible,
  target,
  index
}) {
  const [ isClick, setIsClick ] = useState(false);
  const dispatch = useDispatch();

  const { cards, plannerId, title } = planner;

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(calendarActions.setSelect({
      target,
      value:[plannerId]
    }));
    setIsVisible(false);
  };

  const selectClick = (e) => {
    e.stopPropagation();
    dispatch(calendarActions.setSelect({
      target,
      value:[plannerId]
    }));
    setIsClick((prev) => !prev);
  }

  return (
    <>
      <_PlannerContainer>
        <_SelectContainer>
          {isClick ? (
            <_SelectArrow onClick={(e) => selectClick(e)}>
              <div>{"▼"}</div>
            </_SelectArrow>
          ) : (
            <_SelectArrow onClick={(e) => selectClick(e)}>
              <div>{"▶"}</div>
            </_SelectArrow>
          )}
          <_PlannerTitle onClick={(e) => handleClick(e)}>{(index + 1) + '. ' + title}</_PlannerTitle>
        </_SelectContainer>
        { isClick ? (
          <_CardsContainer>
            {cards.map((cardStatusArr,id) => (
              <CardStatusSelectList
                key={id}
                cardStatusArr={cardStatusArr}
                target={target}
                index={id}
                plannerId={plannerId}
                setIsVisible={setIsVisible}
              />
            ))}
          </_CardsContainer>
        ) : (
          <></>
        )}
      </_PlannerContainer>
    </>
  );
}

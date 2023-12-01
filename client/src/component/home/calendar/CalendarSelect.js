import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { plannerListActions } from "../../../store/plannerList";
import PlannerListLi from "./PlannerListLi";
import useRead from "../../../hook/useRead";
import CalendarSelectList from "./CalendarSelectList";
import { HOME, QUOTE } from "../../../constant/constant";

const _SelectContainer = styled.div`
  background-color: aliceblue;
  width: 170px;
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
  display: flex;
  width: 170px;
  overflow-y: scroll;
  background-color: aliceblue;
  height: 150px;
  border-radius: 2px;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const _Title = styled.div`
  margin-left: 10px;
  text-overflow: ellipsis;
`;

export default function CalendarSelect({target}) {
  const [ isClick, setIsClick ] = useState(false);
  const [ isVisible, setIsVisible ] = useState(false);
  const plannerList = useSelector((state) => state.plannerList);
  const { home, quote } = useSelector( state => state.calendar)
  const [title, setTitle] = useState("");

  useEffect(()=>{
    if(plannerList.length > 0){
      let planner;
      switch(target){
        case(HOME):
          planner = plannerList.find( e => e.plannerId === home[0])
          setTitle(planner.title);
          break;
        case(QUOTE):
          planner = plannerList.find( e => e.plannerId === quote[0])
          setTitle(planner.title);
          break;
      }
    }
  },[plannerList,home,quote])

  const selectClick = (e) => {
    e.stopPropagation();
    setIsClick( prev => !prev );
    setIsVisible( prev => !prev);
  };

  // const plannerTitleClick = (value) => {
  //   setIsVisible(value);
  // };

  return (
    <_Flex>
      <_SelectContainer>
        { isClick ? (
          <_SelectArrow onClick={(e) => selectClick(e)}>
            <div>{"▼"}</div>
          </_SelectArrow>
        ) : (
          <_SelectArrow onClick={(e) => selectClick(e)}>
            <div>{"▶"}</div>
          </_SelectArrow>
        )}
        <_Title onClick={ e => selectClick(e)}>{title}</_Title>
      </_SelectContainer>
      { isVisible ? (
        <_Container>
          {plannerList.map((planner,id) => (
            <CalendarSelectList
              key={planner.plannerId}
              planner={planner}
              setIsVisible={setIsVisible}
              target={target}
              index={id}
            />
          ))}
        </_Container>
      ) : (
        <></>
      )}
    </_Flex>
  );
}

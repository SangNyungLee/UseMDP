import { useSelector } from "react-redux";
import styled from "styled-components";
import PlannerListLi from "./PlannerListLi";
import useRead from "../../../hook/useRead";
import { HOME } from "../../../constant/constant";

const _Container = styled.div`
  border-radius: 5px;
  background-color: #393e46;
  height: 80vh;
  width: 240px;
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: hidden;
  text-overflow: ellipsis;
  padding-top: 30px;
  margin: 0px 30px;
  margin-left: -10px;
  @media screen and (max-width: 1300px) {
    & {
      display: none;
    }
  }
`;

const _PlannerListUl = styled.ul`
  list-style-type: none;
  padding: 5px;
`;

const _Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  color: white;
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

import { useState } from "react";
import CardListLi from "./CardListLi";
import { useDispatch } from "react-redux";
import { calendarActions } from "../../../store/calendar";
import { plannerListActions } from "../../../store/plannerList";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { deleteMyPlanner } from "../../../utils/DataAxios";
import { requestFail } from "../../etc/SweetModal";

const _PlannerTitle = styled.div`
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-left: 3px;
`;

const _PlannerLi = styled.div`
  margin: 5px;
  max-width: 240px;
`;

const _PlannerDiv = styled.div`
  display: flex;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  align-items: center;
  background-color: white;

  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }

  &::before {
    content: "▶";
    margin: 0px 8px;
    font-size: 10px;
    display: inline-block;
    transform: ${({ $visible }) =>
      $visible
        ? "rotate(90deg)"
        : "none"};
    transform-origin: center;
  }
`;

const _PlannerListUl = styled.ul`
  list-style-type: none;
  padding: 5px;
  margin-left: 10px;
`;

const _DelButton = styled.button`
  margin-left: 5px;
  border: none;
  background: none;
  border-radius: 50%;
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: lightgray;
  }
`;

export default function PlannerListLi({ planner }) {
  const { home } = useSelector( state => state.calendar );
  const plannerList = useSelector( state => state.plannerList );
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { cards, plannerId, title } = planner;

  const handleClick = (e) => {
    e.stopPropagation();
    setVisible((prev) => !prev);
    dispatch(calendarActions.setHome([plannerId]));
  };

  const delPlanner = async (e) => {
    e.stopPropagation();
    const res = await deleteMyPlanner(plannerId);
    if (res.status === 200) {
      dispatch(plannerListActions.delPlanner(plannerId));
      if (plannerId === home[0] && plannerList.length > 1) {
        const otherPlanner = plannerList.find(
          (planner) => planner.plannerId !== plannerId
        );
        dispatch(calendarActions.setHome([otherPlanner.plannerId]));
      }
    } else {
      requestFail("플래너 삭제");
    }
  };

  return (
    <_PlannerLi>
      <_PlannerDiv
        $visible={visible ? 1 : undefined}
        onClick={(e) => handleClick(e)}
        $focus={plannerId == home[0] ? 1 : undefined}
      >
        <_PlannerTitle>{title}</_PlannerTitle>
        <_DelButton onClick={(e) => delPlanner(e)}>
          <i
            className="material-icons"
            style={{ fontSize: "15px", color: "black", fontWeight: "bolder" }}
          >
            remove
          </i>
        </_DelButton>
      </_PlannerDiv>

      {visible && (
        <_PlannerListUl>
          {cards.map((cardList, id) => (
            <CardListLi
              cardList={cardList}
              plannerId={plannerId}
              cardStatus={id}
              key={id}
            />
          ))}
        </_PlannerListUl>
      )}
    </_PlannerLi>
  );
}

import { useEffect, useState } from "react";
import { calendarActions } from "../../../store/calendar";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { darken } from "polished";
import CardLi from "./CardLi";

const _PlannerLi = styled.li`
  display: flex;
  color: white;
  background: none;
  padding: 10px;
  margin: 5px;
  border-bottom: 2px solid #202a45;
  border-bottom-color: ${({ $focus }) => ($focus ? "lightgray" : "#202a45")};
  @keyframes dropdown {
    0% {
      transform: translateY(-30%);
    }
    100% {
      transform: translateY(0);
    }
  }

  animation: dropdown 0.5s ease;

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid lightgray;
  }

  /* &::before {
    content: ">";
    margin: 0px 8px;
    display: inline-block;
    transform: ${({ $visible }) => ($visible ? "rotate(90deg)" : "none")}; 
    transform-origin: center;
  } */
`;

const _PlannerListUl = styled.ul`
  list-style-type: none;
  padding: 5px;
  margin-left: 10px;
`;

const _CardStatus = styled.div`
  color: white;
  margin-left: 7px;
`;

export default function CardListLi({ cardList, plannerId, cardStatus }) {
  const [visible, setVisible] = useState(false);
  const { home } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  const [cardListFocus, setCardListFocus] = useState(false);

  useEffect(() => {
    if (home[0] === plannerId) {
      setCardListFocus(home[1] === cardStatus);
    } else {
      setCardListFocus(false);
    }
  }, [home]);

  const cardListHandleClick = (e) => {
    e.stopPropagation();
    setVisible((prev) => !prev);
    dispatch(calendarActions.setHome([plannerId, cardStatus]));
  };

  return (
    <>
      <_PlannerLi
        color={"#ffffff"}
        $visible={visible ? 1 : undefined}
        onClick={(e) => cardListHandleClick(e)}
        $focus={cardListFocus ? 1 : undefined}
      >
        <_CardStatus>
          {cardStatus === 0 ? "todo" : cardStatus === 1 ? "doing" : "done"}
        </_CardStatus>
      </_PlannerLi>
      {visible && (
        <_PlannerListUl>
          {cardList.map((card) => (
            <CardLi
              key={card.cardId}
              plannerId={plannerId}
              cardId={card.cardId}
              title={card.title}
              cardStatus={cardStatus}
            />
          ))}
        </_PlannerListUl>
      )}
    </>
  );
}

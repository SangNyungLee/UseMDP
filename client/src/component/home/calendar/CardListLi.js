import { useEffect, useState } from "react";
import { calendarActions } from "../../../store/calendar";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { darken } from "polished";
import CardLi from "./CardLi";

const _PlannerLi = styled.li`
  display: flex;
  border-radius: 5px;
  color: white;
  background-color: ${(props) =>
    props.$focus ? darken(0.1, props.color) : props.color};
  padding: 10px;
  margin: 5px;
  box-shadow: 1px 1px 1px 1px lightgrey;

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
    background-color: ${(props) =>
      props.$focus ? darken(0.1, props.color) : props.color};
  }

  &::before {
    content: ">";
    margin: 0px 8px;
    display: inline-block;
    transform: ${({ $visible }) =>
      $visible
        ? "rotate(90deg)"
        : "none"}; /* visible이 true일 때 회전, 그 외에는 회전하지 않음 */
    transform-origin: center;
  }
`;

const _PlannerListUl = styled.ul`
  list-style-type: none;
  padding: 5px;
  margin-left: 10px;
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
        color={"#198754"}
        $visible={visible ? 1 : undefined}
        onClick={(e) => cardListHandleClick(e)}
        $focus={cardListFocus ? 1 : undefined}
      >
        <div>
          {cardStatus === 0 ? "todo" : cardStatus === 1 ? "doing" : "done"}
        </div>
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

import { darken } from "polished";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { calendarActions } from "../../../store/calendar";
import { plannerListActions } from "../../../store/plannerList";

const _CardLi = styled.li`
  display: flex;
  border-radius: 5px;
  background-color: ${(props) =>
    props.$focus ? darken(0.1, props.color) : props.color};
  padding: 10px;
  margin: 5px;
  align-items: center;

  &:hover {
    background-color: ${(props) => darken(0.1, props.color)};
  }

  &::before {
    content: ">";
    margin-right: 8px;
    display: inline-block;
    transform-origin: center;
  }
`;

const _DelButton = styled.button`
  margin-left: 5px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
`;

const _CardTitle = styled.span`
  width: 100%;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export default function CardLi({ plannerId, cardId, cardStatus, title }) {
  const { home } = useSelector((state) => state.calendar);
  const cardFocus = home[2] ? home[2] : false;

  const dispatch = useDispatch();

  const liHandleClick = (e, cardId) => {
    e.stopPropagation();
    dispatch(calendarActions.setHome([plannerId, cardStatus, cardId]));
  };

  const delCard = (e, cardId) => {
    e.stopPropagation();
    dispatch(plannerListActions.delCard(cardId));
    if (home.length > 1) {
      if (cardId === home[2]) {
        dispatch(calendarActions.setHome([home[0], home[1]]));
      }
    }
  };

  return (
    <>
      <_CardLi
        key={cardId}
        color={"#FFD6DA"}
        $focus={cardFocus == cardId ? 1 : undefined}
        onClick={(e) => liHandleClick(e, cardId)}
      >
        <_CardTitle>{title}</_CardTitle>
        <_DelButton onClick={(e) => delCard(e, cardId)}>
          <i class="material-icons" style={{ fontSize: "20px", color: "#ccc" }}>
            delete
          </i>
        </_DelButton>
      </_CardLi>
    </>
  );
}

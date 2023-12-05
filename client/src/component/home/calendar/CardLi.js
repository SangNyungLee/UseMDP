import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { calendarActions } from "../../../store/calendar";
import { plannerListActions } from "../../../store/plannerList";
import { deleteCardById } from "../../../utils/DataAxios";

const _CardLi = styled.li`
  display: flex;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  align-items: center;
  background: none;

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
  }

  /* &::before {
    content: ">";
    margin-right: 8px;
    display: inline-block;
    transform-origin: center;
  } */
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
    background-color: #00adb5;
  }
`;

const _CardTitle = styled.span`
  width: 100%;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin-left: 7px;
  color: white;
`;

export default function CardLi({ plannerId, cardId, cardStatus, title }) {
  const { home } = useSelector((state) => state.calendar);
  const cardFocus = home[2] ? home[2] : false;

  const dispatch = useDispatch();

  const liHandleClick = (e, cardId) => {
    e.stopPropagation();
    dispatch(calendarActions.setHome([plannerId, cardStatus, cardId]));
  };

  const delCard = async (e, cardId) => {
    e.stopPropagation();
    await deleteCardById(cardId);
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
        color={"#FFFFFF"}
        $focus={cardFocus == cardId ? 1 : undefined}
        onClick={(e) => liHandleClick(e, cardId)}
      >
        <_CardTitle>{title}</_CardTitle>
        <_DelButton onClick={(e) => delCard(e, cardId)}>
          <i
            class="material-icons"
            style={{ fontSize: "15px", color: "white" }}
          >
            remove
          </i>
        </_DelButton>
      </_CardLi>
    </>
  );
}

import styled from "styled-components";
import { calendarActions } from "../../../store/calendar";
import { useDispatch } from "react-redux";

const _CardTitle = styled.div`
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-left: 10px;
  padding: 5px;
`;

export default function CardSelectList({
  card,
  target,
  plannerId,
  index,
  setIsVisible,
}) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(
      calendarActions.setSelect({
        target,
        value: [plannerId, index, card.cardId],
      })
    );
    setIsVisible(false);
  };

  return (
    <>
      <_CardTitle onClick={(e) => handleClick(e)}>{card.title}</_CardTitle>
    </>
  );
}

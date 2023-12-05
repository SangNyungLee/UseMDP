import { getItemStyle, getItems, getListStyle } from '../../../utils/QuoteSetting';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import NoEditQuoteCard from './NoEditQuoteCard';
import styled from 'styled-components';
import CardListHeader from '../CardListHeader/CardListHeader';
import { useMediaQuery } from 'react-responsive';
import NoEditCardListHeader from './NoEditCardListHeader';
const DivButton = styled.div`
    text-align: center;
    background-color: '#f1f3f5';
    text-size-adjust: 16px;
    &:hover {
        cursor: pointer;
    }
`;

const _CardListContainer = styled.div`
    max-height: 70vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`

export default function NoEditDroppableComponent(props) {
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    const { cardList, cardStatusIndex, planner, handleClick, plannerId } = props;
    const droppableComponentRegister = (provided, snapshot) => ({
        ...provided.droppableProps,
        ref: provided.innerRef,
        style: isMobile ? { ...getListStyle(snapshot.isDraggingOver), width: '30%' } : { ...getListStyle(snapshot.isDraggingOver) },
    });

    const draggableComponentRegister = (provided, snapshot, id) => ({
        ...provided.draggableProps,
        ...provided.dragHandleProps,
        ref: provided.innerRef,
        style: getItemStyle(snapshot.isDragging, provided.draggableProps.style),
        onClick: () => handleClick(cardStatusIndex, id),
    });

    return (
        <Droppable key={cardStatusIndex} droppableId={`${cardStatusIndex}`}>
            {(provided, snapshot) => {
                //Droppable에서 제공하는 무언가 같음. 환경 설정이 들어가 있음.
                return (
                    <>
                        <div {...droppableComponentRegister(provided, snapshot)}>
                            <NoEditCardListHeader pid={plannerId} index={provided.droppableProps['data-rbd-droppable-id']}></NoEditCardListHeader>
                            <_CardListContainer>
                            {cardList.map((card, id) => (
                                <Draggable key={card.cardId} draggableId={card.cardId} index={id}>
                                    {(provided, snapshot) => (
                                        <div {...draggableComponentRegister(provided, snapshot, id)}>
                                            <NoEditQuoteCard card={card} cardIndex={id} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </_CardListContainer>
                        </div>
                    </>
                );
            }}
        </Droppable>
    );
}

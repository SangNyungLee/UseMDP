import copy from 'fast-copy';
import { useDispatch, useSelector } from 'react-redux';
import { plannerListActions } from '../../store/plannerList';
import { getItemStyle, getItems, getListStyle } from '../../utils/QuoteSetting';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import QuoteCard from './QuoteCard';
import { siteActions } from '../../store/site';
import styled from 'styled-components';
import CardListHeader from './CardListHeader/CardListHeader';
import { postCard, deleteCardById } from '../../utils/DataAxios';
import { useMediaQuery } from 'react-responsive';
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

export default function DroppableComponent(props) {
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    const { quote } = useSelector((state) => state.calendar);
    const { cardList, cardStatusIndex, planner, handleClick, plannerId } = props;

    const dispatch = useDispatch();

    const deleteCard = (e, id, card) => {
        console.log('del', e, id, card.cardId);
        e.stopPropagation();
        //
        const result = deleteCardById(card.cardId);
        // const result = axios.delete(
        //   `http://localhost:8080/api/deleteCard/${card.cardId}`,
        //   { withCredentials: true }
        // );

        const newState = copy(planner);
        //idx를 받고, state에서 idx에 해당하는 카드를 지우고, idx보다 높은 곳은 intOrder--를 해준다.
        for (let i = id + 1; i < newState[cardStatusIndex].length; i++) {
            newState[cardStatusIndex][i].intOrder--;
        }

        //redux로 받아온것은 readonly이기 떄문에, 우리가 쓸떄는 새롭게 만들어야한다.
        newState[cardStatusIndex].splice(id, 1);

        console.log('New state', newState);

        dispatch(
            plannerListActions.updatePlanner({
                plannerId: quote[0],
                planner: newState,
            })
        );
    };

    const addCard = async () => {
        const cardStatus = cardStatusIndex === 0 ? 'TODO' : cardStatusIndex === 1 ? 'DOING' : 'DONE';
        const card = getItems(1, planner[cardStatusIndex].length, cardStatus)[0];
        // card.checklists = card.checklists.map((checklist) => {
        //     console.log(checklist);
        //     const { checklistId, ...newCheckList } = checklist;
        //     return newCheckList;
        // });

        // for (let i = 0; i < card.checklists.length; i++) {
        //     const { checklistId, ...newCheckList } = card.checklists[i];
        //     card.checklists[i] = newCheckList;
        // }
        card.plannerId = plannerId;
        card.checklists = [{ checked: 0, title: 'done' }];
        console.log('addcard : ', card);

        const result = await postCard(card);

        dispatch(
            plannerListActions.addCard({
                plannerId: quote[0],
                status: cardStatusIndex,
                card,
            })
        );
        dispatch(siteActions.setIsData(false));
    };

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
                            <CardListHeader pid={plannerId} index={provided.droppableProps['data-rbd-droppable-id']}></CardListHeader>
                            <_CardListContainer>
                                {cardList.map((card, id) => (
                                    <Draggable key={card.cardId} draggableId={card.cardId} index={id}>
                                        {(provided, snapshot) => (
                                            <div {...draggableComponentRegister(provided, snapshot, id)}>
                                                <QuoteCard card={card} deleteCard={deleteCard} cardIndex={id} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </_CardListContainer>
                            <DivButton onClick={addCard}>+ Add new item</DivButton>
                        </div>
                    </>
                );
            }}
        </Droppable>
    );
}

import copy from 'fast-copy';
import { useDispatch } from 'react-redux';
import { plannerListActions } from '../../store/plannerList';
import { useSelector } from 'react-redux';
import { getItemStyle, getItems, getListStyle } from '../../utils/QuoteSetting';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import QuoteCard from './QuoteCard';
import axios from 'axios';
import { async } from 'q';

export default function DroppableComponent(props) {
    const { quote } = useSelector((state) => state.calendar);
    const { item, index, planner, handleClick, plannerId } = props;

    const dispatch = useDispatch();

    console.log('newplanner', planner);
    const deleteCard = async (e, id, card) => {
        e.stopPropagation();
        // console.log(card);
        try {
            const result = await axios.delete(`http://localhost:8080/api/deleteCard/${card.cardId}`);
        } catch (error) {
            console.log(error);
        }
        const newState = copy(planner);
        //idx를 받고, state에서 idx에 해당하는 카드를 지우고, idx보다 높은 곳은 intOrder--를 해준다.
        for (let i = id + 1; i < newState[index].length; i++) {
            newState[index][i].intOrder--;
        }

        //redux로 받아온것은 readonly이기 떄문에, 우리가 쓸떄는 새롭게 만들어야한다.
        newState[index].splice(id, 1);
        dispatch(
            plannerListActions.updatePlanner({
                id: quote[0],
                planner: newState,
            })
        );
    };

    const addCard = async () => {
        const cardStatus = index == 0 ? 'TODO' : index == 1 ? 'DOING' : 'DONE';
        const card = getItems(1, planner[index].length, cardStatus)[0];

        card.plannerId = plannerId;
        console.log('addcard : ', card);
        const result = await axios.post('http://localhost:8080/api/postCard', card);
        dispatch(
            plannerListActions.addCard({
                id: quote[0],
                status: index,
                card,
            })
        );
    };

    const droppableComponentRegister = (provided, snapshot) => ({
        ...provided.droppableProps,
        ref: provided.innerRef,
        style: getListStyle(snapshot.isDraggingOver),
    });

    const draggableComponentRegister = (provided, snapshot, id) => ({
        ...provided.draggableProps,
        ...provided.dragHandleProps,
        ref: provided.innerRef,
        style: getItemStyle(snapshot.isDragging, provided.draggableProps.style),
        onClick: () => handleClick(index, id),
    });

    return (
        <Droppable key={index} droppableId={`${index}`}>
            {(provided, snapshot) => {
                //Droppable에서 제공하는 무언가 같음. 환경 설정이 들어가 있음.
                return (
                    <div {...droppableComponentRegister(provided, snapshot)}>
                        {item.map((card, id) => (
                            <Draggable key={card.cardId} draggableId={card.cardId} index={id}>
                                {(provided, snapshot) => (
                                    <div {...draggableComponentRegister(provided, snapshot, id)}>
                                        <QuoteCard
                                            card={card}
                                            deleteCard={(e) => {
                                                deleteCard(e, id, card);
                                            }}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        <button type="button" onClick={addCard}>
                            {' '}
                            Add new item{' '}
                        </button>
                    </div>
                );
            }}
        </Droppable>
    );
}

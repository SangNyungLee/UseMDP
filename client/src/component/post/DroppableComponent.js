import copy from "fast-copy";
import { useDispatch } from "react-redux";
import { plannerListActions } from "../../store/plannerList";
import { useSelector } from "react-redux";
import { getItemStyle, getItems, getListStyle } from "../../utils/QuoteSetting";
import { Draggable, Droppable } from "react-beautiful-dnd";
import QuoteCard from "./QuoteCard";

export default function DroppableComponent(props){
    const { quote } = useSelector( state => state.calendar);
    const { cardList, cardStatusIndex, planner, handleClick } = props
    
    const dispatch = useDispatch();

    const deleteCard = (e, id) => {
        e.stopPropagation();

        console.log("planner",planner);
        console.log("id",id);
        console.log("cardstatus",cardStatusIndex);
        console.log("quote",quote[0]);

        const newState = copy(planner);
        //idx를 받고, state에서 idx에 해당하는 카드를 지우고, idx보다 높은 곳은 intOrder--를 해준다.
        for (let i = id + 1; i < newState[cardStatusIndex].length; i++) {
            newState[cardStatusIndex][i].intOrder--;
        }

        //redux로 받아온것은 readonly이기 떄문에, 우리가 쓸떄는 새롭게 만들어야한다.
        newState[cardStatusIndex].splice(id, 1);

        console.log("New state",newState)

        dispatch(plannerListActions.updatePlanner({
            plannerId: quote[0],
            planner: newState
        }))
    }

    const addCard = () => {
        const cardStatus = cardStatusIndex === 0 ? 'TODO' : cardStatusIndex === 1 ? 'DOING' : 'DONE';
        const card = getItems(1,planner[cardStatusIndex].length,cardStatus)[0]
        dispatch(plannerListActions.addCard({
            plannerId: quote[0],
            status: cardStatusIndex,
            card,
        }))
    }

    const droppableComponentRegister = (provided,snapshot) => ({
        ...provided.droppableProps,
        ref: provided.innerRef,
        style: getListStyle(snapshot.isDraggingOver),
    })

    const draggableComponentRegister = (provided, snapshot, id) => ({
        ...provided.draggableProps,
        ...provided.dragHandleProps,
        ref: provided.innerRef,
        style: getItemStyle(snapshot.isDragging, provided.draggableProps.style),
        onClick: () => handleClick(cardStatusIndex, id)
    })

    return (
        <Droppable key={cardStatusIndex} droppableId={`${cardStatusIndex}`}>
            {(provided, snapshot) => {
                //Droppable에서 제공하는 무언가 같음. 환경 설정이 들어가 있음.
                return (
                    <div {...droppableComponentRegister(provided,snapshot)}>
                        { cardList.map((card, id) => (
                            <Draggable key={card.cardId} draggableId={card.cardId} index={id}>
                                {(provided, snapshot) => (
                                    <div {...draggableComponentRegister(provided,snapshot,id)}>
                                        <QuoteCard card={card} deleteCard={deleteCard} cardIndex={id}/>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        <button type="button" onClick={addCard}> Add new item </button>
                    </div>
                );
            }}
        </Droppable>
    )
}
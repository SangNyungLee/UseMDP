import { useState } from "react";
import { calendarActions } from "../../../store/calendar";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { plannerListActions } from "../../../store/plannerList";
import { useSelector } from "react-redux";

const _DelButton = styled.button`
    margin-left: 5px;
    /* background-color: skyblue;
    border: none; */
`;

export default function ChecklistLi({cardList,plannerId,cardStatus}){
    const [ visible, setVisible ] = useState(false);
    const { home } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const cardListHandleClick = () => {
        setVisible( prev => !prev )
        dispatch(calendarActions.setHome([plannerId,cardStatus]))
    }

    const liHandleClick = (cardId) => {
        dispatch(calendarActions.setHome([plannerId,cardStatus,cardId]))
    }

    const delCard = (e,cardId) => {
        e.stopPropagation()
        dispatch(plannerListActions.delCard(cardId))
        if ( home.length > 1 ){
            if(cardId === home[2]){
                console.log("home state",[home[0],home[1]])
                dispatch(calendarActions.setHome([home[0],home[1]]))
            }
        }
    }

    return (
        <>
            <div onClick={cardListHandleClick}>{(cardStatus === 0) ? 'todo' : (cardStatus === 1) ? 'doing' : 'done'}</div>
            { visible && <ul>
                { cardList.map( card => (
                    <li key={card.cardId} onClick={()=>liHandleClick(card.cardId)}>
                        <span>{card.title}</span>
                        <_DelButton onClick={(e) => delCard(e,card.cardId)}>x</_DelButton>
                    </li>
                ))}
            </ul>
            }
        </>
    )
}
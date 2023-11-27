import { useState } from "react";
import CardListLi from "./CardListLi";
import { useDispatch } from "react-redux";
import { calendarActions } from "../../../store/calendar";
import { plannerListActions } from "../../../store/plannerList";
import { useSelector } from "react-redux";
import styled from "styled-components";

const _PlannerBox = styled.div`
    display: flex;
`

const _DelButton = styled.button`
    margin-left: 5px;
    /* background-color: skyblue;
    border: none; */
`;

export default function PlannerListLi({planner}){
    const { home } = useSelector( state => state.calendar);
    const plannerList = useSelector ( state => state.plannerList);
    const [ visible, setVisible ] = useState(false);
    const dispatch = useDispatch();

    const defaultLoad = (planner) => {
        const currentTime = new Date();
        const filteredEvents = planner.map(plan => {
            return plan.filter(event => {
                const startDate = new Date(event.startDate);
                const endDate = new Date(event.endDate);
                return startDate <= currentTime && currentTime <= endDate;
            })
        });
        return filteredEvents;
    }

    // const checklist = defaultLoad(plan.cards);
    const { cards, plannerId, title } = planner;

    const handleClick = () => {
        setVisible( prev => !prev )
        dispatch(calendarActions.setHome([plannerId]))
    }

    const delPlanner = (e) => {
        e.stopPropagation()
        dispatch(plannerListActions.delPlanner(plannerId))
        if (plannerId === home[0]){
            const otherPlanner = plannerList.find( planner => planner.plannerId !== plannerId )
            dispatch(calendarActions.setHome([otherPlanner.plannerId]))
        }
    }

    return (
    <>
        <_PlannerBox>
            <div onClick={handleClick}>{title}</div>
            <_DelButton onClick={ e => delPlanner(e)}>x</_DelButton>
        </_PlannerBox>
        { visible && <ul>
            { cards.map((cardList,id) => <li key={id}>
                    <CardListLi cardList={cardList} plannerId={plannerId} cardStatus={id}/>
                </li>
            )}
        </ul>
        }
    </>
    )
}
import { useState } from "react";
import CardListLi from "./CardListLi";
import { useDispatch } from "react-redux";
import { calendarActions } from "../../../store/calendar";
import { plannerListActions } from "../../../store/plannerList";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { darken } from "polished";
import { deleteMyPlanner } from "../../../utils/DataAxios";

const _PlannerTitle = styled.div`
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
`

const _PlannerLi = styled.div`
    margin: 5px;
    max-width: 240px;
`

const _PlannerDiv = styled.div`
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.$focus ? darken(0.1, props.color) : props.color };
    padding: 10px;
    margin: 5px;

    &:hover {
        background-color: ${(props) => darken(0.1, props.color)};
    }

    &::before {
        content: ">";
        margin-right: 8px;
        display: inline-block;
        transform: ${( props) => ( props.visible ? 'rotate(90deg)' : 'none')}; /* visible이 true일 때 회전, 그 외에는 회전하지 않음 */
        transform-origin: center;
    }
`;

const _PlannerListUl = styled.ul`
    list-style-type: none;
    padding: 5px;
    margin-left: 10px;
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

    const handleClick = (e) => {
        e.stopPropagation()
        setVisible( prev => !prev )
        dispatch(calendarActions.setHome([plannerId]))
    }

    const delPlanner = (e) => {
        e.stopPropagation()
        deleteMyPlanner(plannerId)
        dispatch(plannerListActions.delPlanner(plannerId))
        if ((plannerId === home[0]) && (plannerList.length > 1)){
            const otherPlanner = plannerList.find( planner => planner.plannerId !== plannerId )
            dispatch(calendarActions.setHome([otherPlanner.plannerId]))
        }
    }

    return (
        <_PlannerLi>
            <_PlannerDiv
                $visible={visible ? 1 : undefined}
                color={"#FFD6DA"}
                onClick={ e => handleClick(e) }
                $focus={plannerId == home[0] ? 1 : undefined}>
                <_PlannerTitle>{title}</_PlannerTitle>
                <_DelButton onClick={ e => delPlanner(e)}>x</_DelButton>
            </_PlannerDiv>
            { visible && <_PlannerListUl>
                { cards.map((cardList,id) =>
                    <CardListLi cardList={cardList} plannerId={plannerId} cardStatus={id} key={id}/>
                )}
            </_PlannerListUl>
            }
        </_PlannerLi>
    )
}
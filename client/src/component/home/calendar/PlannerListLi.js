import { useState } from "react";
import ChecklistLi from "./ChecklistLi";
import { useDispatch } from "react-redux";
import { calendarActions } from "../../../store/calendar";

export default function PlannerListLi({plan,firstIndex}){
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
    const checklist = plan.cards;

    const handleClick = () => {
        setVisible( prev => !prev )
        dispatch(calendarActions.setHome([firstIndex]))
    }

    return (
    <>
        <div onClick={handleClick}>{plan.title}</div>
        { visible && <ul>
            { checklist.map((todo,id) => <li key={id}>
                    <ChecklistLi todo={todo} firstIndex={firstIndex} secondIndex={id}/>
                </li>
            )}
        </ul>
        }
    </>
    )
}
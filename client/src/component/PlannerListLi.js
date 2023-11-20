import { useState } from "react";
import TodoListLi from "./TodoListLi";

export default function PlannerListLi({plan}){
    const [ visible, setVisible ] = useState(false);

    const todoLoad = (planner) => {
        const currentTime = new Date();
        const filteredEvents = planner.dataContent.map(plan => {
            return plan.filter(event => {
                const startDate = new Date(event.startDate);
                const endDate = new Date(event.endDate);
                return startDate <= currentTime && currentTime <= endDate;
            })
        });
        return filteredEvents;
    }

    const todoList = todoLoad(plan);

    return (
    <>
        <div onClick={() => setVisible( prev => !prev)}>{plan.title}</div>
        { visible && <ul>
            { todoList.map((todo,id) => <li key={id}>
                    <TodoListLi todo={todo} id={id}/>
                </li>
            )}
        </ul>
        }
    </>
    )
}
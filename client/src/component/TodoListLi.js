import { useState } from "react";

export default function TodoListLi({todo,id}){
    const [ visible, setVisible ] = useState(false);

    return (
        <>
            <div onClick={() => setVisible( prev => !prev )}>{(id === 0) ? 'todo' : (id === 1) ? 'doing' : 'done'}</div>
            { visible && <ul>
                { todo.map( (plan,index) => <li key={index}>{plan.title}</li>)}
            </ul>
            }
        </>
    )
}
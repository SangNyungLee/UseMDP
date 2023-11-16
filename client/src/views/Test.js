import styled from "styled-components"
import { initialState } from "../constant/TestData"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { moveAction } from "../store/move"
import { DONE, PROGRESS, TODO } from "../constant/constant"
import { useDrag, useDrop } from "react-dnd";

const _MDP = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

const _Container = styled.div`
    min-width: 100px;
    max-width: 500px;
    min-height: 300px;
    max-height: 900px;
    background-color: skyblue;
    border-radius: 27px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DraggableComponent = ({ id, name, type, moveComponent }) => {
    const [, drag] = useDrag({
      type: "COMPONENT",
      item: { id },
    });
  
    const [, drop] = useDrop({
      accept: "COMPONENT",
      hover: (draggedItem) => {
        if (draggedItem.id !== id) {
          moveComponent(type, draggedItem.id, id);
        }
      },
    });
  
    return (
      <div ref={(node) => drag(drop(node))} style={{ border: "1px solid black", padding: "8px", margin: "4px" }}>
        {name}
      </div>
    );
};

export default function Test(){
    const dispatch = useDispatch();
    const move = useSelector( state => state.move )
    const { todo, progress, done } = move;

    const moveComponent = (type, fromId, toId) => {
        switch(type){
            case TODO:
                dispatch(moveAction.replaceTodo({fromId, toId}));
                break
            case PROGRESS:
                dispatch(moveAction.replaceProgress({fromId, toId}));
                break
            case DONE:
                dispatch(moveAction.replaceDone({fromId, toId}));
                break

        }
    };

    useEffect(()=>{
        dispatch(moveAction.setInitialState(initialState));
    },[])

    return (
        <>
        <h1>테스트 페이지</h1>
        <_MDP>
            <_Container>
                { todo.map( e =>
                    <DraggableComponent key={e.id} {...e} type={TODO} moveComponent={moveComponent} />
                )}
            </_Container>

            <_Container>
                { progress.map( e =>
                    <DraggableComponent key={e.id} {...e} type={PROGRESS} moveComponent={moveComponent} />
                )}
            </_Container>

            <_Container>
                { done.map( e =>
                    <DraggableComponent key={e.id} {...e} type={DONE} moveComponent={moveComponent} />
                )}
            </_Container>
        </_MDP>

        </>
    )
}
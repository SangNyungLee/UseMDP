import React, { useEffect, Component } from 'react';
import styled from "styled-components"
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { initialState } from "../constant/TestData"
import { useDispatch, useSelector } from "react-redux"
import { moveAction } from "../store/move"
import { DONE, PROGRESS, TODO } from "../constant/constant"


const grid = 8;

const getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer(아이템을 보기 좋게 만드는 몇 가지 기본 스타일)
    userSelect: 'none',
    padding: grid * 2,
    marginBottom: grid,
  
    // change background colour if dragging(드래깅시 배경색 변경)
    background: isDragging ? 'lightgreen' : 'grey',
  
    // styles we need to apply on draggables(드래그에 필요한 스타일 적용)
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});


export default function Test2(){
    const dispatch = useDispatch();
    const move = useSelector( state => state.move )
    const { todo, progress, done } = move;


    useEffect(()=>{
        dispatch(moveAction.setInitialState(initialState));
    },[])

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            console.log("not exist destination")
          return;
        }
    
        const reorderedItems = reorder(
          todo,
          result.source.index,
          result.destination.index
        );

        console.log("reorder",reorderedItems);
    
        // 여기서 reorderedItems를 사용하여 상태를 업데이트합니다.
    };
    
    if(todo){
        todo.map(e => console.log(typeof(e.id)))
    }
    
    return (
        <>
        <h1>테스트 페이지</h1>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {todo.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                            <li
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                {item.name}
                            </li>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>
                )}
            </Droppable>
        </DragDropContext>

        </>
    )
}
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Example from '../modal/ModalExample';
import ThumbnailMaker from './RightClicker/ThumbnailMaker';
import { useDispatch, useSelector } from 'react-redux';
import { planActions } from '../../store/planner';
import { cardActions } from '../../store/card';
import copy from 'fast-copy';

// 가짜 데이터 생성기, cover_color, title이 있음.
//title이야 content 바꿔쓰면 되지만, cover_color를 제공하는 것을 해볼것.
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        description: ``,
        title: `title ${k + offset}`,
        cover_Color: '#FFD6DA',
        start_date: new Date(2023, 0, 1).toISOString(),
        end_date: new Date(2023, 0, 1).toISOString(),
        todolist: [{ done: false }, { jpa: false }],
        intOrder: k,
        separator: offset < 10 ? 'TODO' : offset < 15 ? 'DOING' : 'DONE',
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    console.log('move : ', source, destination, droppableSource, droppableDestination);
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: `0 0 ${grid * 2}px 0`,
    margin: `0 0 ${grid}px 0`,
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px',
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250,
});

export default function QuoteApp() {
    //페이크 아이템을 10개, 5개를 만드는데, 두번쨰는 10부터,세번째는 15부터 시작하도록
    const state = useSelector((state) => state.planner);
    console.log('state:', state);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const thumnnailRef = useRef(null);
    //dispatch 선언
    const dispatch = useDispatch(); // dispatch로 재선언하여 사용한다.

    useEffect(() => {}, []);

    function handleThumbnailDownload() {
        console.log('download', thumnnailRef.current);
        ThumbnailMaker(thumnnailRef);
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    function handleClick(ind, index) {
        // console.log(ind, index);
        // console.log(state[ind][index]);
        // dispatch(cardActions.setInitialState(state[ind][index]));

        dispatch(cardActions.setCard(state[ind][index]));
        // console.log(state[ind][index]);
        openModal();
    }
    //dnd에서는, dragend와 onclick이 구분되게 됨.
    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            dispatch(planActions.reOrderCardByIdx({ sInd, source: source.index, destination: destination.idx }));
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            //setState(newState);
            dispatch(planActions.setPlans(newState));
        } else {
            dispatch(planActions.moveCardByIdx({ source, destination }));
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];
            dispatch(planActions.setPlans(newState.filter((group) => group.length)));
            //setState(newState.filter((group) => group.length));
        }
    }
    // ...state, getItems(1)
    return (
        <div ref={thumnnailRef}>
            {/* 무언가를 추가하기 위해서, 무조건 state[0]에 생성되도록하였음. */}
            <Example modalStatus={isModalOpen} modalClose={closeModal}></Example>
            <button
                type="button"
                onClick={() => {
                    handleThumbnailDownload();
                    const newState = copy(state);
                    newState[0].push(...getItems(1, newState.length));
                    //setState([state[0], state[1], state[2]]);
                    dispatch(planActions.setPlans([newState[0], newState[1], newState[2]]));
                }}
            >
                Add new item
            </button>
            <div style={{ display: 'flex' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {/* DragDropContext에서는 drag가 가능한 공간임. 여기서 state를 map으로 푼다. */}
                    {state.map((el, ind) => {
                        // 여기서는, state의 원소, getItems(10), getItems(5, 10), getItems(5, 15)가 순서대로.
                        //ind는 인덱스임.
                        // console.log(el, ind);
                        return (
                            <Droppable key={ind} droppableId={`${ind}`}>
                                {(provided, snapshot) => {
                                    //Droppable에서 제공하는 무언가 같음. 환경 설정이 들어가 있음.
                                    // console.log('provided: ', provided);
                                    // console.log('snapshot: ', snapshot); {isModalOpen ? <Example></Example> : null}
                                    return (
                                        //
                                        <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                                            {el.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)} onClick={() => handleClick(ind, index)}>
                                                            <div style={{ position: 'relative', backgroundColor: item.cover_Color, height: '20px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}></div>
                                                            <div
                                                                style={{
                                                                    paddingTop: '8px',
                                                                    display: 'flex',
                                                                    justifyContent: 'space-around',
                                                                }}
                                                            >
                                                                {item.title}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        // const newState = [...state];
                                                                        const newState = copy(state);
                                                                        //redux로 받아온것은 readonly이기 떄문에, 우리가 쓸떄는 새롭게 만들어야한다.
                                                                        newState[ind].splice(index, 1);
                                                                        dispatch(planActions.setPlans(newState));
                                                                        // setState(newState.filter((group) => group.length));
                                                                    }}
                                                                >
                                                                    delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    );
                                }}
                            </Droppable>
                        );
                    })}
                </DragDropContext>
            </div>
        </div>
    );
}

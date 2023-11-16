import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Example from '../modal/ModalExample';
import ThumbnailMaker from './RightClicker/ThumbnailMaker';
import { useDispatch, useSelector } from 'react-redux';
import { cardActions } from '../store/card';

// 가짜 데이터 생성기, cover_color, title이 있음.
//title이야 content 바꿔쓰면 되지만, cover_color를 제공하는 것을 해볼것.
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`,
        title: `title ${k + offset}`,
        cover_Color: '#FFD6DA',
        date: new Date(2023, 0, 1).toString(),
        todolist: [{ done: false }, { jpa: false }],
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
    const [state, setState] = useState([getItems(10), getItems(5, 10), getItems(5, 15)]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardItem, setCardItem] = useState({});
    const thumnnailRef = useRef(null);

    //dispatch 선언
    const dispatch = useDispatch(); // dispatch로 재선언하여 사용한다.

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
        dispatch(cardActions.setInitialState(state[ind][index]));
        setCardItem(state[ind][index]);
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
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter((group) => group.length));
        }
    }

    // ...state, getItems(1)
    return (
        <div ref={thumnnailRef}>
            {/* 무언가를 추가하기 위해서, 무조건 state[0]에 생성되도록하였음. */}
            <Example modalStatus={isModalOpen} cardItem={cardItem}></Example>
            <button
                type="button"
                onClick={() => {
                    handleThumbnailDownload();
                    state[0].push(...getItems(1, state.length));
                    setState([state[0], state[1], state[2]]);
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
                                                        <>
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
                                                                            const newState = [...state];
                                                                            newState[ind].splice(index, 1);
                                                                            setState(newState.filter((group) => group.length));
                                                                        }}
                                                                    >
                                                                        delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </>
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

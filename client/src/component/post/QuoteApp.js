<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Example from "../modal/ModalExample";
import ThumbnailMaker from "./RightClicker/ThumbnailMaker";
import { useDispatch, useSelector } from "react-redux";
import { planActions } from "../../store/planner";
import { cardActions } from "../../store/card";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import copy from "fast-copy";
import DataDownload from "../../utils/DataDownload";
import DataReaderModal from "../reader/DataReaderModal";

import { useSearchParams } from "react-router-dom";
=======
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Example from '../modal/ModalExample';
import ThumbnailMaker from './RightClicker/ThumbnailMaker';
import { useDispatch, useSelector } from 'react-redux';
import { planActions } from '../../store/planner';
import { cardActions } from '../../store/card';
import axios from 'axios';
import copy from 'fast-copy';
import DataDownload from '../../utils/DataDownload';
import DataReaderModal from '../reader/DataReaderModal';
import QuoteAppCalendar from './QuoteAppCalendar';
import { plannerListActions } from '../../store/plannerList';
import { v4 } from 'uuid';
import { Spinner } from 'react-bootstrap';

import { useSearchParams } from 'react-router-dom';
import CalendarModal from '../home/calendar/CalendarModal';

>>>>>>> develop
// 가짜 데이터 생성기, coverColor, title이 있음.
//title이야 content 바꿔쓰면 되지만, coverColor를 제공하는 것을 해볼것.
// getItems = (count, offset=0) => {}  :   count랑 offset을 변수로 받되 offset은 기본값을 0으로
// Array.from({ length: count }, (v, k) => k) : 길이가 count인 배열을 생성하는데
// (v,k) => k 를 적어 넣으면 k 값을 0부터 count - 1 까지 for문 돌리듯 대응시킨다 (관용적으로 쓴다 봐도 될듯)

// 가짜 데이터 생성기, coverColor, title이 있음.
//title이야 content 바꿔쓰면 되지만, coverColor를 제공하는 것을 해볼것.
<<<<<<< HEAD
const getItems = (count, offset = 0, separatorStr = "TODO") =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    cardId: `item-${k + offset}-${new Date().getTime()}-${separatorStr}`,
    post: ``,
    title: `title ${k + offset}`,
    coverColor: "#FFD6DA",
    startDate: new Date(2023, 0, 1).toISOString(),
    endDate: new Date(2023, 0, 1).toISOString(),
    todolist: [{ done: false }, { jpa: false }],
    intOrder: offset,
    separatorPlan: separatorStr,
    sourceResource: null,
  }));
=======

const getItems = (count, offset = 0, separatorStr = 'TODO') =>
    Array.from({ length: count }, (v, k) => k).map((k) => {
        const r1 = Math.floor(Math.random() * 31);
        const r2 = Math.floor(Math.random() * 3) + 1;
        const currentTime = new Date()
        return {
            cardId: v4(),
            post: ``,
            title: `title ${k + offset}`,
            coverColor: '#FFD6DA',
            startDate: new Date(Date.now() + (r1 - 15) * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + (r1 + r2 - 15) * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: currentTime.toISOString(),
            updatedAt: currentTime.toISOString(),
            cardStatus: separatorStr,
            checklists: [
                {
                    checklistId: k * 2,
                    checked: 0,
                    title: "done",
                    createdAt: currentTime.toISOString(),
                    updatedAt: currentTime.toISOString(),
                },
                { 
                    checklistId: k * 2 + 1,
                    checked: 0,
                    title: "jpa",
                    createdAt: currentTime.toISOString(),
                    updatedAt: currentTime.toISOString(),
                }
            ],
            intOrder: offset,
            sourceResource: null,
        }
    });
>>>>>>> develop
//reOrder
//2) 같은 칸톤 보드에서 위치 바꿈
//3) 위에서 아래로 갔으면, 그 사이에 있는 값들의 intOrder를 ++해주고,
//4)아래서 위로 갔으면 그 사이에 있는 값들의 intOrder를 --해준다.
const reorder = (list, startIndex, endIndex) => {
  //아래에서 위로 갔다면
  const newList = copy(list);
  if (startIndex < endIndex) {
    newList[startIndex].intOrder = endIndex;
    for (let i = startIndex + 1; i <= endIndex; i++) {
      newList[i].intOrder--;
    }
  } else {
    newList[startIndex].intOrder = endIndex;
    for (let i = endIndex + 1; i <= startIndex; i++) {
      newList[i].intOrder++;
    }
  }
  const result = Array.from(newList);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
// idx를 받았을 때, idx4개를 받아 order를 바꿔줘야함.
//시작지에서는 droppableSource로 접근하고, index초과인 친구들의 intOrder를 -1하면 된다.
// 도착지에서는 droppableid로 접근하고, index초과인 친구들의 intOrder를 +1하면 된다.
const move = (source, destination, droppableSource, droppableDestination) => {
<<<<<<< HEAD
  console.log(
    "move : ",
    source,
    destination,
    droppableSource,
    droppableDestination
  );
  const sourceClone = copy(source);
  const destClone = copy(destination);
  //시작지에서는 droppableSource로 접근하고, index초과인 친구들의 intOrder를 -1하면 된다.
  for (let i = droppableSource.index + 1; i < sourceClone.length; i++) {
    sourceClone[i].intOrder--;
  }
  // 도착지에서는 droppableDestination 접근하고, index초과인 친구들의 intOrder를 +1하면 된다
  for (let i = droppableDestination.index + 1; i < destClone.length; i++) {
    destClone[i].intOrder++;
  }
  //그리고 옮길 source card의 intOrder는, 도착지의 index로 재조정
  sourceClone[droppableSource.index].intOrder = droppableDestination.index;
  //separtorPlan도 수정해주자.
  sourceClone[droppableSource.index].separatorPlan =
    droppableDestination.droppableId == 0
      ? "TODO"
        ? droppableDestination.droppableId == 1
        : "DOING"
      : "DONE";
=======
    console.log('move : ', source, destination, droppableSource, droppableDestination);
    const sourceClone = copy(source);
    const destClone = copy(destination);
    //시작지에서는 droppableSource로 접근하고, index초과인 친구들의 intOrder를 -1하면 된다.
    for (let i = droppableSource.index + 1; i < sourceClone.length; i++) {
        sourceClone[i].intOrder--;
    }
    // 도착지에서는 droppableDestination 접근하고, index초과인 친구들의 intOrder를 +1하면 된다
    for (let i = droppableDestination.index + 1; i < destClone.length; i++) {
        destClone[i].intOrder++;
    }
    //그리고 옮길 source card의 intOrder는, 도착지의 index로 재조정
    sourceClone[droppableSource.index].intOrder = droppableDestination.index;
    //separtorPlan도 수정해주자.
    sourceClone[droppableSource.index].cardStatus = droppableDestination.droppableId == 0 ? ('TODO' ? droppableDestination.droppableId == 1 : 'DOING') : 'DONE';
>>>>>>> develop

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
  userSelect: "none",
  padding: `0 0 ${grid * 2}px 0`,
  margin: `0 0 ${grid}px 0`,
  borderTopRightRadius: "10px",
  borderTopLeftRadius: "10px",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});
const statusIndexMap = {
  TODO: 0,
  DOING: 1,
  DONE: 2,
};
export default function QuoteApp() {
<<<<<<< HEAD
  //페이크 아이템을 10개, 5개를 만드는데, 두번쨰는 10부터,세번째는 15부터 시작하도록
  const state = useSelector((state) => state.planner);
  // console.log('state:', state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const thumnnailRef = useRef(null);
  //dispatch 선언
  const dispatch = useDispatch(); // dispatch로 재선언하여 사용한다.
  const [readData, setReadData] = useState();
  const [plannerTitle, setPlannerTitle] = useState("MDP");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const btoa = searchParams.get("id");
      const rearrangedArray = [[], [], []];
      const result = await axios(`/api/getPlanner/${btoa}`);
      const Planner = result.data;
      console.log(Planner);
      const { cards, ...newPlanner } = Planner;
      cards.forEach((item) => {
        const statusIndex = statusIndexMap[item.cardStatus];
        rearrangedArray[statusIndex].push(item);
      });
      dispatch(planActions.setPlansInit(rearrangedArray));
      // 혹시나 테스트중 데이터가 비어있을 경우
      // if (response.data[0]) {
      //     const data = response.data[0].cardList;
      //     const newState = [[], [], []];
      //     for (let i = 0; i < data.length; i++) {
      //         if (data[i].separatorPlan === 'TODO') {
      //             data[i].cardId = 'a' + data[i].cardId;
      //             newState[0].push(data[i]);
      //         } else if (data[i].separatorPlan === 'DOING') {
      //             data[i].cardId = 'a' + data[i].cardId;
      //             newState[1].push(data[i]);
      //         } else {
      //             data[i].cardId = 'a' + data[i].cardId;
      //             newState[2].push(data[i]);
      //         }
      //     }
      //     // console.log(newState);
      //     dispatch(planActions.setPlansInit(newState));
      //     // dispatch(planActions.setPlansInit([getItems(8), getItems(5, 8), getItems(5, 13)]));
      // } else {
      //     dispatch(planActions.setPlansInit([getItems(8), getItems(5, 8), getItems(5, 13)]));
      // }
=======
    //페이크 아이템을 10개, 5개를 만드는데, 두번쨰는 10부터,세번째는 15부터 시작하도록
    const state = useSelector((state) => state.planner);
    const plannerList = useSelector((state) => state.plannerList);
    const { quote } = useSelector((state) => state.calendar);

    let planner = [];

    if (plannerList.length > 0 ){
        planner = plannerList[quote[0]].cards;
    }

    // console.log('state:', state);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const thumnnailRef = useRef(null);
    //dispatch 선언
    const dispatch = useDispatch(); // dispatch로 재선언하여 사용한다.
    const [ readData, setReadData ] = useState();
    const [ plannerTitle, setPlannerTitle ] = useState('MDP');

    useEffect(() => {
        const fetchData = async () => {
            // const response = await axios.get('/plannerTest');
            const response = { data: [null] }
            
            // 혹시나 테스트중 데이터가 비어있을 경우
            if (response.data[0]) {
                const data = response.data[0].cardList;
                const newState = [[], [], []];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].cardStatus === 'TODO') {
                        data[i].cardId = 'a' + data[i].cardId;
                        newState[0].push(data[i]);
                    } else if (data[i].cardStatus === 'DOING') {
                        data[i].cardId = 'a' + data[i].cardId;
                        newState[1].push(data[i]);
                    } else {
                        data[i].cardId = 'a' + data[i].cardId;
                        newState[2].push(data[i]);
                    }
                }
                // console.log(newState);
                dispatch(planActions.setPlansInit(newState));
            } else {
                const cards = [getItems(8,0,"TODO"), getItems(5, 8, "DOING"), getItems(5, 13, "DONE")]
                const currentTime = new Date();
                const plannerList = [{
                    plannerId: 0,
                    creator: "default user name",
                    title: "useMDP",
                    likePlanner: 0,
                    thumbnail: "",
                    plannerAccess: "PRIVATE",
                    isDefault: 0,
                    createdAt: currentTime.toISOString(),
                    updatedAt: currentTime.toISOString(),
                    cards,
                }];
                // dispatch(planActions.setPlansInit(cards));
                dispatch(plannerListActions.setPlannersInit(plannerList));
            }
        };
        // dispatch(planActions.setPlansInit([getItems(8), getItems(5, 8), getItems(5, 13)]));
        fetchData();
    }, []);

    function handleThumbnailDownload() {
        console.log('download', thumnnailRef.current);
        ThumbnailMaker(thumnnailRef);
    }

    const openModal = () => {
        setIsModalOpen(true);
>>>>>>> develop
    };
    // dispatch(planActions.setPlansInit([getItems(8), getItems(5, 8), getItems(5, 13)]));
    fetchData();
  }, []);

  function handleThumbnailDownload() {
    console.log("download", thumnnailRef.current);
    ThumbnailMaker(thumnnailRef);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

<<<<<<< HEAD
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveState = () => {
    DataDownload(plannerTitle, state);
  };

  function handleClick(ind, index) {
    dispatch(cardActions.setCard(state[ind][index]));
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
      //setState(newState);
      dispatch(planActions.setPlans(newState));
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      dispatch(planActions.setPlans(newState));
      //setState(newState.filter((group) => group.length));
    }
  }
  // ...state, getItems(1)
  if (!state) {
    return (
      //Spinner
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else {
    return (
      <div ref={thumnnailRef}>
        {/* 무언가를 추가하기 위해서, 무조건 state[0]에 생성되도록하였음. */}
        <Example modalStatus={isModalOpen} modalClose={closeModal}></Example>
        <button
          type="button"
          onClick={() => {
            handleThumbnailDownload();
          }}
        >
          ThumbnailMaker
        </button>
        <input
          value={plannerTitle}
          onChange={(e) => setPlannerTitle(e.target.value)}
        />
        <button type="button" onClick={saveState}>
          저장하기
        </button>
        <DataReaderModal setState={setReadData} />
        <div style={{ display: "flex" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            {/* DragDropContext에서는 drag가 가능한 공간임. 여기서 state를 map으로 푼다. */}
            {state.map((el, ind) => {
              // 여기서는, state의 원소, getItems(10), getItems(5, 10), getItems(5, 15)가 순서대로.
              //ind는 인덱스임.
              // console.log(el, ind);
              return (
                <>
                  <Droppable key={ind} droppableId={`${ind}`}>
                    {(provided, snapshot) => {
                      //Droppable에서 제공하는 무언가 같음. 환경 설정이 들어가 있음.
                      // console.log('provided: ', provided);
                      // console.log('snapshot: ', snapshot); {isModalOpen ? <Example></Example> : null}
                      return (
                        //
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                          {...provided.droppableProps}
                        >
                          {el.map((item, index) => (
                            <Draggable
                              key={item.cardId}
                              draggableId={item.cardId}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                  onClick={() => handleClick(ind, index)}
                                >
                                  <div
                                    style={{
                                      position: "relative",
                                      backgroundColor: item.coverColor,
                                      height: "20px",
                                      borderTopRightRadius: "10px",
                                      borderTopLeftRadius: "10px",
                                    }}
                                  ></div>
                                  <div
                                    style={{
                                      paddingTop: "8px",
                                      display: "flex",
                                      justifyContent: "space-around",
                                    }}
                                  >
                                    {item.title}
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        //상위 onclick을 무력화한다.
                                        e.stopPropagation();
                                        // const newState = [...state];
                                        const newState = copy(state);
                                        //idx를 받고, state에서 idx에 해당하는 카드를 지우고, idx보다 높은 곳은 intOrder--를 해준다.
                                        for (
                                          let i = index + 1;
                                          i < newState[ind].length;
                                          i++
                                        ) {
                                          newState[ind][i].intOrder--;
                                        }

                                        //redux로 받아온것은 readonly이기 떄문에, 우리가 쓸떄는 새롭게 만들어야한다.
                                        newState[ind].splice(index, 1);
                                        dispatch(
                                          planActions.setPlans(newState)
                                        );
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
                          <button
                            type="button"
                            onClick={() => {
                              const newState = copy(state);
                              const separatorStr =
                                ind == 0 ? "TODO" : ind == 1 ? "DOING" : "DONE";
                              newState[ind].push(
                                ...getItems(
                                  1,
                                  newState[ind].length,
                                  separatorStr
                                )
                              );
                              //setState([state[0], state[1], state[2]]);
                              dispatch(
                                planActions.setPlans([
                                  newState[0],
                                  newState[1],
                                  newState[2],
                                ])
                              );
                            }}
                          >
                            Add new item
                          </button>
                        </div>
                      );
                    }}
                  </Droppable>
                  <div>구분</div>
                </>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    );
  }
=======
    function handleClick(ind, index) {
        // dispatch(cardActions.setCard(state[ind][index]));
        // openModal();
        setSelectedCard(planner[ind][index]);
        setVisible(true)
    }

    const [ selectedCard, setSelectedCard ] = useState({
        cardId : v4(),
        title: "default title",
        coverColor: "#FFD6DA",
        post: "",
        intOrder: 0,
        startDate: "2023-10-01T15:00:00.000Z",
        endDate: "2023-10-04T15:00:00.000Z",
        createdAt: "2023-11-23T08:41:37.615Z",
        updatedAt: "2023-11-23T08:41:37.615Z",
        cardStatus: "TODO",
        checklists: [
          {
            checklistId: 0,
            checked: 0,
            title: "done",
            createdAt: "2023-11-23T08:41:37.615Z",
            updatedAt: "2023-11-23T08:41:37.615Z"
          },
          {
            checklistId: 1,
            checked: 0,
            title: "jpa",
            createdAt: "2023-11-23T08:41:37.615Z",
            updatedAt: "2023-11-23T08:41:37.615Z"
          }
        ],
        "sourceResource": null
      });

    const [ visible, setVisible ] = useState(false);

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
            const items = reorder(planner[sInd], source.index, destination.index);
            const newState = [...planner];
            newState[sInd] = items;
            //setState(newState);
            // dispatch(planActions.setPlans(newState));
            dispatch(plannerListActions.updatePlanner({
                id: quote[0],
                planner: newState, 
            }))
        } else {
            const result = move(planner[sInd], planner[dInd], source, destination);
            const newState = [...planner];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];
            // dispatch(planActions.setPlans(newState));
            //setState(newState.filter((group) => group.length));
            dispatch(plannerListActions.updatePlanner({
                id: quote[0],
                planner: newState, 
            }))
        }
    }
    // ...state, getItems(1)

    if (!state) {
        return (
            //Spinner
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    } else {
        return (
        <div style={{"display":"flex"}}>
            <div ref={thumnnailRef}>
                {/* 무언가를 추가하기 위해서, 무조건 state[0]에 생성되도록하였음. */}
                <CalendarModal
                selectedCard={selectedCard}
                modalStatus={visible}
                modalClose={()=>setVisible(false)}
                />
                <button
                    type="button"
                    onClick={() => {
                        handleThumbnailDownload();
                    }}
                >
                    ThumbnailMaker
                </button>
                <input value={plannerTitle} onChange={(e) => setPlannerTitle(e.target.value)} />
                <button type="button" onClick={saveState}>
                    저장하기
                </button>
                <DataReaderModal setState={setReadData} />
                <div style={{ display: 'flex' }}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {/* DragDropContext에서는 drag가 가능한 공간임. 여기서 state를 map으로 푼다. */}
                        {planner.map((el, ind) => {
                            // 여기서는, state의 원소, getItems(10), getItems(5, 10), getItems(5, 15)가 순서대로.
                            //ind는 인덱스임.
                            // console.log(el, ind);
                            return (
                                <>
                                    <Droppable key={ind} droppableId={`${ind}`}>
                                        {(provided, snapshot) => {
                                            //Droppable에서 제공하는 무언가 같음. 환경 설정이 들어가 있음.
                                            // console.log('provided: ', provided);
                                            // console.log('snapshot: ', snapshot); {isModalOpen ? <Example></Example> : null}
                                            return (
                                                //
                                                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                                                    {el.map((item, index) => (
                                                        <Draggable key={item.cardId} draggableId={item.cardId} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)} onClick={() => handleClick(ind, index)}>
                                                                    <div style={{ position: 'relative', backgroundColor: item.coverColor, height: '20px', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}></div>
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
                                                                            onClick={(e) => {
                                                                                //상위 onclick을 무력화한다.
                                                                                e.stopPropagation();
                                                                                // const newState = [...state];
                       
                                                                                const newState = copy(planner);
                                                                                //idx를 받고, state에서 idx에 해당하는 카드를 지우고, idx보다 높은 곳은 intOrder--를 해준다.
                                                                                for (let i = index + 1; i < newState[ind].length; i++) {
                                                                                    newState[ind][i].intOrder--;
                                                                                }

                                                                                //redux로 받아온것은 readonly이기 떄문에, 우리가 쓸떄는 새롭게 만들어야한다.
                                                                                newState[ind].splice(index, 1);
                                                                                dispatch(plannerListActions.updatePlanner({
                                                                                    id: quote[0],
                                                                                    planner: newState
                                                                                }))
                                                                                // dispatch(planActions.setPlans(newState));
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
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            //const newState = copy(planner);
                                                            const cardStatus = ind == 0 ? 'TODO' : ind == 1 ? 'DOING' : 'DONE';
                                                            //newState[ind].push(...getItems(1, newState[ind].length, cardStatus));
                                                            //console.log("card",getItems(1,newState[ind].length, cardStatus))
                                                            const card = getItems(1,planner[ind].length,cardStatus)[0]
                                                            dispatch(plannerListActions.addCard({
                                                                id: quote[0],
                                                                status: ind,
                                                                card,
                                                            }))
                                                            //setState([state[0], state[1], state[2]]);
                                                            // dispatch(planActions.setPlans([newState[0], newState[1], newState[2]]));
                                                        }}
                                                    >
                                                        Add new item
                                                    </button>
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                    <div>구분</div>
                                </>
                            );
                        })}
                    </DragDropContext>
                </div>
            </div>
            <QuoteAppCalendar/>
        </div>
    )};
>>>>>>> develop
}

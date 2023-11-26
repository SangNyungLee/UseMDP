import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { planActions } from '../../store/planner';
import QuoteAppCalendar from './QuoteAppCalendar';
import { plannerListActions } from '../../store/plannerList';

import { getOneCard, getOneDefaultPlanner } from '../../utils/QuoteSetting';
import { reorder, move } from '../../utils/QuoteController';
import styled from 'styled-components';
import QuoteHeader from './QuoteHeader';
import QuoteSpinner from './QuoteSpinner';
import DroppableComponent from './DroppableComponent';

const _QuoteAppContainer = styled.div`
    display: flex;
`
const _QuoteContainer = styled.div`
    display: flex;
`

export default function QuoteApp() {
    const plannerList = useSelector((state) => state.plannerList);
    const { quote } = useSelector((state) => state.calendar);
    const thumnnailRef = useRef(null);
    const [ selectedCard, setSelectedCard ] = useState( getOneCard(0,"TODO") );
    const [ visible, setVisible ] = useState(false);
    
    const dispatch = useDispatch();

    let planner;
    let plannerId = quote[0];
    let plannerTitle;

    if (plannerList.length > 0 ){
        const { cards, plannerId: id, title , ...rest } = plannerList.find( planner => planner.plannerId === quote[0])
        planner = cards
        plannerId = id
        plannerTitle = title
    }
 
    useEffect(() => {
        const fetchData = async () => {
            // const btoa = searchParams.get('id');
            // const rearrangedArray = [[], [], []];
            // const result = await axios(`http://localhost:8080/api/getPlanner/${btoa}`);
            // const Planner = result.data;
            // console.log(Planner);
            // const { cards, ...newPlanner } = Planner;
            // cards.forEach((item) => {
            //     const statusIndex = statusIndexMap[item.cardStatus];
            //     rearrangedArray[statusIndex].push(item);
            // });
            // dispatch(planActions.setPlansInit(rearrangedArray));
            // const response = await axios.get('/plannerTest');
            const response = { data: [null] };

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
                dispatch(planActions.setPlansInit(newState));
            } else {
                const defaultPlanner = getOneDefaultPlanner()
                const plannerList = [ defaultPlanner ];
                dispatch(plannerListActions.setPlannersInit(plannerList));
            }
        };
        fetchData();
    }, []);

    function cardClick(ind, index) {
        setSelectedCard(planner[ind][index]);
        setVisible(true);
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
            const items = reorder(planner[sInd], source.index, destination.index);
            const newState = [...planner];
            newState[sInd] = items;
            dispatch(plannerListActions.updatePlanner({
                plannerId: quote[0],
                planner: newState, 
            }))
        } else {
            const result = move(planner[sInd], planner[dInd], source, destination);
            const newState = [...planner];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];
            dispatch(plannerListActions.updatePlanner({
                plannerId: quote[0],
                planner: newState, 
            }))
        }
    }
    // ...state, getItems(1)

    console.log("plannerList",plannerList);

    if (!planner) {
        return (
            <QuoteSpinner/>
        );
    } else {
        return (
        <_QuoteAppContainer>
            <div ref={thumnnailRef}>
                <QuoteHeader
                    selectedCard={selectedCard}
                    thumnnailRef={thumnnailRef}
                    visible={visible}
                    setVisible={setVisible}
                    plannerList={plannerList}
                    plannerId={plannerId}
                    title={plannerTitle}
                    />
                <_QuoteContainer>
                    <DragDropContext onDragEnd={onDragEnd}>
                        { planner.map((cardList, index) =>
                            <DroppableComponent
                                cardList={cardList}
                                cardStatusIndex={index}
                                planner={planner}
                                handleClick={cardClick}/>
                        )}
                    </DragDropContext>
                </_QuoteContainer>
            </div>
            <QuoteAppCalendar/>
        </_QuoteAppContainer>
    )};
}

import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import QuoteAppCalendar from './QuoteAppCalendar';
import { plannerListActions } from '../../store/plannerList';
import { calendarActions } from '../../store/calendar';
import { getOneCard, getOneDefaultPlanner } from '../../utils/QuoteSetting';
import { reorder, move } from '../../utils/QuoteController';
import styled from 'styled-components';
import QuoteHeader from './QuoteHeader';
import QuoteSpinner from './QuoteSpinner';
import DroppableComponent from './DroppableComponent';
import useLocalStorage from 'use-local-storage';
import { useParams } from 'react-router-dom';
const _QuoteAppContainer = styled.div`
    display: flex;
`;
const _QuoteContainer = styled.div`
    display: flex;
`;

export default function QuoteApp() {
    const plannerList = useSelector((state) => state.plannerList);
    const { quote } = useSelector((state) => state.calendar);
    const thumnnailRef = useRef(null);
    const [selectedCard, setSelectedCard] = useState(getOneCard(0, 'TODO'));
    const [visible, setVisible] = useState(false);
    const [localdata, setLocalData] = useLocalStorage('List', []);
    const [localQuote, setLocalQuote] = useLocalStorage('Quote', []);
    const dispatch = useDispatch();

    let planner;
    let plannerId;
    let plannerTitle;

    if (plannerList.length > 0) {
        const { cards, plannerId: id, title, ...rest } = plannerList[quote[0]];
        planner = cards;
        plannerId = id;
        plannerTitle = title;
    } else if (localdata.length > 0) {
        console.log('local in if', localdata);
        // console.log(localStorage.getItem('List'));
        const { cards, plannerId: id, title, ...rest } = localdata[0];
        dispatch(plannerListActions.setPlannersInit(localdata));
        dispatch(calendarActions.setQuote([0]));
        planner = cards;
        plannerId = id;
        plannerTitle = title;
    }

    useEffect(() => {
        console.log('HI', localdata);
    }, [localdata, localQuote]);

    useEffect(() => {
        const fetchData = async () => {
            if (plannerList.length > 0) {
                setLocalData(plannerList);
                setLocalQuote(quote);
            }
            const response = { data: [null] };

            // 혹시나 테스트중 데이터가 비어있을 경우
            // if (response.data[0]) {
            // } else {
            //     const defaultPlanner = getOneDefaultPlanner();
            //     const plannerList = [defaultPlanner];
            //     dispatch(plannerListActions.setPlannersInit(plannerList));
            // }
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
            dispatch(
                plannerListActions.updatePlanner({
                    id: quote[0],
                    planner: newState,
                })
            );
        } else {
            const result = move(planner[sInd], planner[dInd], source, destination);
            const newState = [...planner];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];
            dispatch(
                plannerListActions.updatePlanner({
                    id: quote[0],
                    planner: newState,
                })
            );
        }
    }
    // ...state, getItems(1)
    // console.log('local', localdata, localQuote);
    // console.log('planners', plannerList, planner, plannerId);
    if (!planner) {
        return <QuoteSpinner />;
    } else {
        return (
            <_QuoteAppContainer>
                <div ref={thumnnailRef}>
                    <QuoteHeader selectedCard={selectedCard} thumnnailRef={thumnnailRef} visible={visible} setVisible={setVisible} planner={planner} plannerId={plannerId} />
                    <_QuoteContainer>
                        <DragDropContext onDragEnd={onDragEnd}>
                            {planner.map((item, index) => (
                                <DroppableComponent item={item} index={index} planner={planner} handleClick={cardClick} />
                            ))}
                        </DragDropContext>
                    </_QuoteContainer>
                </div>
                <QuoteAppCalendar />
            </_QuoteAppContainer>
        );
    }
}

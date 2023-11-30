import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import QuoteAppCalendar from './QuoteAppCalendar';
import { plannerListActions } from '../../store/plannerList';
import { calendarActions } from '../../store/calendar';
import { siteActions } from '../../store/site';
import { getOneCard, getOneDefaultPlanner } from '../../utils/QuoteSetting';
import { reorder, move } from '../../utils/QuoteController';
import styled from 'styled-components';
import QuoteHeader from './QuoteHeader';
import QuoteSpinner from './QuoteSpinner';
import DroppableComponent from './DroppableComponent';
import useLocalStorage from 'use-local-storage';

import axios from 'axios';
import { getCardAxios, getPlannerBtoA, patchMoveCards } from '../../utils/DataAxios';
const _QuoteAppContainer = styled.div`
    margin: '20px';
    display: flex;
`;

const _QuoteContainer = styled.div`
    display: flex;
    margin: '20px';
`;

export default function QuoteApp() {
    const plannerList = useSelector((state) => state.plannerList);
    const { quote } = useSelector((state) => state.calendar);
    const site = useSelector((state) => state.site);
    const thumnnailRef = useRef(null);
    const [selectedCard, setSelectedCard] = useState(getOneCard(0, 'TODO'));
    const [visible, setVisible] = useState(false);
    const [localdata, setLocalData] = useLocalStorage('List', []);
    const [localQuote, setLocalQuote] = useLocalStorage('Quote', []);
    const dispatch = useDispatch();

    let planner;
    let plannerId = quote[0];
    let plannerTitle;

    function sortByIntOrder(data) {
        // intOrder를 기준으로 오름차순 정렬
        const tmp = [[], [], []];
        for (let i = 0; i < 3; i++) {
            tmp[i] = data[i].slice().sort((a, b) => a.intOrder - b.intOrder);
        }
        // 새로운 배열 반환
        console.log('sort: ', tmp);
        return tmp;
    }
    if (plannerList.length > 0 && plannerList[0]) {
        const { cards, plannerId: id, title, ...rest } = plannerList.find((planner) => planner.plannerId === quote[0]);
        planner = sortByIntOrder(cards);
        plannerId = id;
        plannerTitle = title;
    } else if (localdata.length > 0) {
        console.log('local in if', localdata);
        const { cards, plannerId: id, title, ...rest } = localdata[0];
        dispatch(plannerListActions.setPlannersInit(localdata));
        dispatch(calendarActions.setQuote([id]));
        planner = cards;
        plannerId = id;
        plannerTitle = title;
    }

    //planner가 바뀔때마다, localStoage에 저장하는 코드.

    // useEffect(() => {
    //     console.log('HI', localdata);
    // }, [localdata, localQuote]);
    useEffect(() => {
        async function fetchData() {
            const result = await getPlannerBtoA(btoa(plannerId));
            const cardList = result.data.cards;
            const cards = [[], [], []];
            for (let i = 0; i < cardList.length; i++) {
                if (cardList[i].cardStatus === 'TODO') {
                    cards[0].push(cardList[i]);
                } else if (cardList[i].cardStatus === 'DOING') {
                    cards[1].push(cardList[i]);
                } else if (cardList[i].cardStatus === 'DONE') {
                    cards[2].push(cardList[i]);
                }
            }
            dispatch(plannerListActions.replaceCards({ id: plannerId, cards: cards }));
            dispatch(siteActions.setIsData(true));
        }
        if (!site.isData) {
            // isData가 false면, 전부 재로딩한다.
            fetchData();
        }
        console.log('Check site');
    }, [site.isData]);

    useEffect(() => {
        const fetchData = async () => {
            if (plannerList.length > 0) {
                setLocalData(plannerList);
                setLocalQuote(quote);
            }
        };
        fetchData();
    }, [plannerList]);

    async function cardClick(ind, index) {
        const cardResult = await getCardAxios(planner[ind][index].cardId);
        console.log('newchecklist', cardResult);

        setSelectedCard(cardResult);
        setVisible(true);
        // setSelectedCard(planner[ind][index]);
    }

    //dnd에서는, dragend와 onclick이 구분되게 됨.
    function onDragEnd(result, provided) {
        console.log(result, provided);
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const mapper = {
                0: 'TODO',
                1: 'DOING',
                2: 'DONE',
            };
            const data = {
                plannerId,
                sourceCardId: planner[sInd][source.index].cardId,
                sourceCardOrder: planner[sInd][source.index].intOrder,
                sourceCardStatus: planner[sInd][source.index].cardStatus,
                destinationCardOrder: destination.index,
                destinationCardStatus: mapper[destination.droppableId],
            };
            const result2 = patchMoveCards(data);
            const items = reorder(planner[sInd], source.index, destination.index);
            const newState = [...planner];
            newState[sInd] = items;
            dispatch(
                plannerListActions.updatePlanner({
                    id: quote[0],
                    plannerId: quote[0],
                    planner: newState,
                })
            );
        } else {
            const mapper = {
                0: 'TODO',
                1: 'DOING',
                2: 'DONE',
            };
            const data = {
                plannerId,
                sourceCardId: planner[sInd][source.index].cardId,
                sourceCardOrder: planner[sInd][source.index].intOrder,
                sourceCardStatus: planner[sInd][source.index].cardStatus,
                destinationCardOrder: destination.index,
                destinationCardStatus: mapper[destination.droppableId],
            };
            const result2 = patchMoveCards(data);
            const result = move(planner[sInd], planner[dInd], source, destination);
            const newState = [...planner];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];
            dispatch(
                plannerListActions.updatePlanner({
                    id: quote[0],
                    plannerId: quote[0],
                    planner: newState,
                })
            );
        }
    }
    // ...state, getItems(1)

    console.log('plannerList', plannerList);

    if (!planner) {
        return <QuoteSpinner />;
    } else {
        return (
            <div>
                <QuoteHeader selectedCard={selectedCard} thumnnailRef={thumnnailRef} visible={visible} setVisible={setVisible} plannerList={plannerList} plannerId={plannerId} title={plannerTitle} />
                <_QuoteAppContainer>
                    <div style={{ margin: '20px' }}>
                        <_QuoteContainer ref={thumnnailRef}>
                            <DragDropContext
                                onDragEnd={(result, provided) => {
                                    onDragEnd(result, provided);
                                }}
                            >
                                {planner.map((cardList, index) => (
                                    <DroppableComponent key={index} cardList={cardList} cardStatusIndex={index} planner={planner} handleClick={cardClick} plannerId={plannerId} />
                                ))}
                            </DragDropContext>
                        </_QuoteContainer>
                    </div>
                    <QuoteAppCalendar />
                </_QuoteAppContainer>
            </div>
        );
    }
}

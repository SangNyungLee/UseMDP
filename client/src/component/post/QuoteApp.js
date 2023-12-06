import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import QuoteAppCalendar from './QuoteAppCalendar';
import { plannerListActions } from '../../store/plannerList';
import { calendarActions } from '../../store/calendar';
import { siteActions } from '../../store/site';
import { getOneCard } from '../../utils/QuoteSetting';
import { reorder, move } from '../../utils/QuoteController';
import styled from 'styled-components';
import QuoteHeader from './QuoteHeader';
import QuoteSpinner from './QuoteSpinner';
import DroppableComponent from './DroppableComponent';
import useLocalStorage from 'use-local-storage';
import sky from '../../constant/img/sky.jpg';
import { getCardAxios, getPlannerBtoA, patchMoveCards } from '../../utils/DataAxios';
import { requestFail } from '../etc/SweetModal';
import { useNavigate } from 'react-router';

const _QuoteAppContainer = styled.div`
    display: flex;
    flex: 3;
    background-image: url(${(props) => props.$image});
    background-size: cover;
    background-repeat: no-repeat;
`;

const _QuoteContainer = styled.div`
    display: flex;
    flex: 3;
    align-items: flex-start;
    justify-content: space-evenly;
    margin-top: 20px;
`;

const _Thumbnail = styled.div`
    display: flex;
    width: 100%;
    /* height: 80vh; */
`;

export default function QuoteApp() {
    const [switchContext, setSwitchContext] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const plannerList = useSelector((state) => state.plannerList);
    const { quote } = useSelector((state) => state.calendar);
    const site = useSelector((state) => state.site);
    const thumnnailRef = useRef(null);
    const [selectedCard, setSelectedCard] = useState(getOneCard(0, 'TODO'));
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const navi = useNavigate();

    let planner;
    let plannerId = quote[0];

    let plannerTitle;
    let plannerThumbnail;

    let plannerInfo;

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
        const { cards, plannerId: id, creator, title, thumbnail, plannerAccess: access, taglist: list, ...rest } = plannerList.find((planner) => planner.plannerId === quote[0]);
        planner = sortByIntOrder(cards);
        plannerId = id;
        plannerTitle = title;
        plannerThumbnail = thumbnail;
        plannerInfo = {
            plannerId: id,
            creator,
            title,
            thumbnail,
            plannerAccess: access,
            taglist: list ? list : [],
        };
    }

    //planner가 바뀔때마다, localStoage에 저장하는 코드.

    // useEffect(() => {
    //     console.log('HI', localdata);
    // }, [localdata, localQuote]);
    useEffect(() => {
        async function fetchData() {
            const result = await getPlannerBtoA(btoa(plannerId));
            if (result.status === 200) {
                const cardList = result.data.data.cards;
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
            } else {
                requestFail('플래너 불러오기');
                navi('/home');
            }
        }
        if (!site.isData) {
            // isData가 false면, 전부 재로딩한다.
            fetchData();
        }
        console.log('Check site');
    }, [site.isData]);

    async function cardClick(ind, index) {
        const result = await getCardAxios(planner[ind][index].cardId);
        if (result.status === 200) {
            const cardResult = result.data.data;
            console.log('cardResult', cardResult);

            setSelectedCard(cardResult);
            setVisible(true);
        } else {
            requestFail('카드 정보');
        }
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
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Attach the event listener on component mount
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // If the window width is greater than or equal to 800px, hide the calendar
    const isCalendarVisible = windowWidth > 1024;

    if (!planner) {
        return <QuoteSpinner />;
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <QuoteHeader selectedCard={selectedCard} thumnnailRef={thumnnailRef} visible={visible} setVisible={setVisible} plannerList={plannerList} plannerInfo={plannerInfo} setSwitch={setSwitchContext} />
                <_QuoteAppContainer $image={plannerThumbnail ? plannerThumbnail : sky}>
                    <_Thumbnail ref={thumnnailRef}>
                        {/* 1024보다 클때 -> 모두 출력 */}
                        {isCalendarVisible ? (
                            <>
                                <_QuoteContainer>
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
                                <QuoteAppCalendar />
                            </>
                        ) : switchContext == 0 ? (
                            <_QuoteContainer>
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
                        ) : (
                            <QuoteAppCalendar />
                        )}
                    </_Thumbnail>
                </_QuoteAppContainer>
            </div>
        );
    }
}

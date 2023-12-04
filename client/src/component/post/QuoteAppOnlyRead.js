import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import NoEditQuoteAppCalendar from './QuoteAppOnlyReads/NoEditQuoteAppCalendar';
import { getOneCard, getOneDefaultPlanner } from '../../utils/QuoteSetting';
import { reorder, move } from '../../utils/QuoteController';
import styled from 'styled-components';
import QuoteHeader from './QuoteHeader';
import QuoteSpinner from './QuoteSpinner';
import NoEditDroppableComponent from './QuoteAppOnlyReads/NoEditDroppableComponent';
import sky from '../../constant/img/sky.jpg';
import { useSearchParams } from 'react-router-dom';
import { getCardAxios, getPlannerBtoA } from '../../utils/DataAxios';
import { plannerCardStatusDevide, plannerListCardStatusDevide } from '../../utils/DataParsing';
import { useDispatch } from 'react-redux';
import { noEditPlannerAction } from '../../store/noEditPlanner';
import NoEditQuoteHeader from './QuoteAppOnlyReads/NoEditQuoteHeader';
const _QuoteAppContainer = styled.div`
    display: flex;
    flex: 3;
    background-image: url(${(props) => props.image});
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

export default function QuoteAppOnlyRead() {
    const dispatch = useDispatch();
    const [switchContext, setSwitchContext] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const noEditPlanner = useSelector((state) => state.noEditPlanner);
    const thumnnailRef = useRef(null);
    const [selectedCard, setSelectedCard] = useState(getOneCard(0, 'TODO'));
    const [visible, setVisible] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    //데이터 초기화. 새로고침을 하던, 뭘하던 받아서 axios받아서 noEditPlanner 초기화
    useEffect(() => {
        async function fetchData() {
            const btoaid = searchParams.get('id');
            const data = await getPlannerBtoA(btoaid);
            console.log('initData', data.data);
            let tmp = plannerCardStatusDevide(data.data.data);
            tmp = { ...tmp, quote: 1 };
            dispatch(noEditPlannerAction.setPlansInit(tmp));
        }
        fetchData();
    }, []);
    console.log('noEditPlanner', noEditPlanner);
    let planner;
    let plannerId;
    let plannerTitle;
    let plannerThumbnail;
    let plannerInfo;

    function sortByIntOrder(data) {
        // intOrder를 기준으로 오름차순 정렬
        const tmp = [[], [], []];
        for (let i = 0; i < 3; i++) {
            tmp[i] = data[i].slice().sort((a, b) => a.intOrder - b.intOrder);
        }
        return tmp;
    }
    if (noEditPlanner.length != 0) {
        const { cards, plannerId: id, creator, title, thumbnail, plannerAccess: access, taglist: list, ...rest } = noEditPlanner;
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
            taglist: list,
        };
    }

    async function cardClick(ind, index) {
        console.log('cardResult', planner[ind][index]);
        setSelectedCard(planner[ind][index]);
        setVisible(true);
    }

    //여기서는 상태를 바꿀 생각이 없어서, event를 걸지 않음. state변화 X
    function onDragEnd(result, provided) {
        const { source, destination } = result;

        if (!destination) {
            return;
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
    const isCalendarVisible = windowWidth > 1024;
    if (!planner) {
        return <QuoteSpinner />;
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <NoEditQuoteHeader selectedCard={selectedCard} thumnnailRef={thumnnailRef} visible={visible} setVisible={setVisible} plannerList={noEditPlanner} plannerInfo={plannerInfo} setSwitch={setSwitchContext} />
                <_QuoteAppContainer image={plannerThumbnail ? sky : plannerThumbnail}>
                    <_Thumbnail ref={thumnnailRef}>
                        {isCalendarVisible ? (
                            <>
                                <_QuoteContainer>
                                    <DragDropContext
                                        onDragEnd={(result, provided) => {
                                            onDragEnd(result, provided);
                                        }}
                                    >
                                        {planner.map((cardList, index) => (
                                            <NoEditDroppableComponent key={index} cardList={cardList} cardStatusIndex={index} planner={planner} handleClick={cardClick} plannerId={plannerId} noEdit={true} />
                                        ))}
                                    </DragDropContext>
                                </_QuoteContainer>
                                <NoEditQuoteAppCalendar />
                            </>
                        ) : switchContext == 0 ? (
                            <_QuoteContainer>
                                <DragDropContext
                                    onDragEnd={(result, provided) => {
                                        onDragEnd(result, provided);
                                    }}
                                >
                                    {planner.map((cardList, index) => (
                                        <NoEditDroppableComponent key={index} cardList={cardList} cardStatusIndex={index} planner={planner} handleClick={cardClick} plannerId={plannerId} />
                                    ))}
                                </DragDropContext>
                            </_QuoteContainer>
                        ) : (
                            <NoEditQuoteAppCalendar />
                        )}
                    </_Thumbnail>
                </_QuoteAppContainer>
            </div>
        );
    }
}

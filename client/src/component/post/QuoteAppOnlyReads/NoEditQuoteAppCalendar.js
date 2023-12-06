import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import moment from 'moment';
import NoEditMDPmodal from './NoEditMDPmodal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { eventStyleGetter, getNestedElement } from '../../../utils/CalendarController';
import { getOneCard } from '../../../utils/QuoteSetting';
import { dateParsing } from '../../../utils/DataParsing';
import styled from 'styled-components';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const _Toolbar = styled.div`
    /* width: 55vw; */
    margin-bottom: 10px;
    margin-top: 10px;
    @media screen and (max-width: 1300px) {
        & {
            /* width: 65vw; */
        }
    }
`;

const _ToGoButton = styled.div`
    border: none;
    background: none;
    font-size: 20px;
    width: 30px;
    text-align: center;
    border-radius: 50%;

    &:hover {
        cursor: pointer;
        background-color: #ccc;
    }
`;

const _Label = styled.span`
    font-size: 25px;
    font-weight: bolder;
`;

const _SwitchButton = styled.button`
    background: none;
    border: none;
    margin: 0px 5px;
    width: 70px;

    &:hover {
        background-color: #ccc;
    }
`;

const CustomToolbar = ({ label, onNavigate, onView, onDrillDown }) => {
    const goToToday = (e) => {
        e.stopPropagation();
        onNavigate('TODAY'); // 오늘 날짜로 이동
    };

    const goToNext = (e) => {
        e.stopPropagation();
        onNavigate('NEXT'); // 다음 달로 이동
    };

    const goToPrev = (e) => {
        e.stopPropagation();
        onNavigate('PREV'); // 이전 달로 이동
    };

    const switchToMonthView = (e) => {
        e.stopPropagation();
        onView('month'); // 주 단위(view)로 전환
    };

    const switchToWeekView = (e) => {
        e.stopPropagation();
        onView('week'); // 주 단위(view)로 전환
    };

    const switchToDayView = (e) => {
        e.stopPropagation();
        onView('day'); // 날짜 단위(view)로 전환
    };

    const switchToAgendaView = (e) => {
        e.stopPropagation();
        onView('agenda'); // 날짜 단위(view)로 전환
    };

    return (
        <_Toolbar>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginBottom: '10px',
                }}
            >
                <_ToGoButton onClick={(e) => goToPrev(e)}>{'<'}</_ToGoButton>
                <div onClick={(e) => goToToday(e)} style={{ textAlign: 'center' }}>
                    <_Label>{label}</_Label>
                </div>
                <_ToGoButton onClick={(e) => goToNext(e)}>{'>'}</_ToGoButton>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                <_SwitchButton onClick={(e) => switchToMonthView(e)}>Month</_SwitchButton>
                <_SwitchButton onClick={(e) => switchToWeekView(e)}>Week</_SwitchButton>
                <_SwitchButton onClick={(e) => switchToDayView(e)}>Day</_SwitchButton>
                <_SwitchButton onClick={(e) => switchToAgendaView(e)}>Agenda</_SwitchButton>
            </div>
        </_Toolbar>
    );
};

export default function NoEditQuoteAppCalendar(props) {
    const plannerList = useSelector((state) => state.noEditPlanner);
    const quote = plannerList.quote;

    const [events, setEvents] = useState();
    const [selectedCard, setSelectedCard] = useState(getOneCard(0, 'TODO'));
    const [visible, setVisible] = useState(false);

    //plannerId를 안쓰니까, 단축하겠음.
    //QUOTE 하나만 쓰고, 여러개를 보여줄 생각이 없다.
    const cardStatusIndex = quote ? quote : 0;
    const cardStatus = cardStatusIndex ? (cardStatusIndex === 0 ? 'TODO' : cardStatusIndex === 1 ? 'DOING' : 'DONE') : 'ALL';

    useEffect(() => {
        const selectedEvents = cardStatus === 'ALL' ? plannerList.cards.map((e) => e.flat()) : plannerList.cards[cardStatusIndex];
        setEvents(dateParsing(selectedEvents));
    }, [plannerList]);

    const onSelectEvent = (event, e) => {
        setSelectedCard(event);
        setVisible(true);
    };

    return (
        <>
            <NoEditMDPmodal selectedCard={selectedCard} modalStatus={visible} modalClose={() => setVisible(false)} />
            <DnDCalendar
                defaultDate={moment().toDate()}
                defaultView="month"
                startAccessor="startDate"
                endAccessor="endDate"
                events={events}
                localizer={localizer}
                onSelectEvent={onSelectEvent}
                resizable
                selectable
                style={{
                    height: '95%',
                    backgroundColor: 'white',
                    flex: 2,
                    overflowY: 'hidden',
                    borderRadius: '10px',
                    margin: '10px 10px 10px 10px',
                    padding: '8px',
                }}
                eventPropGetter={eventStyleGetter}
                components={{
                    toolbar: CustomToolbar,
                }}
            />
        </>
    );
}

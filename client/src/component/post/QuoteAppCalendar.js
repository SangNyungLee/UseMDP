import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { plannerListActions } from '../../store/plannerList';
import MDPModal from '../modal/MDPModal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { eventStyleGetter, getNestedElement } from '../../utils/CalendarController';
import { getOneCard } from '../../utils/QuoteSetting';
import { dateParsing } from '../../utils/DataParsing';
import { patchCard, postCard } from '../../utils/DataAxios';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function QuoteAppCalendar(props) {
    const plannerList = useSelector((state) => state.plannerList);
    const { quote } = useSelector((state) => state.calendar);
    const dispatch = useDispatch();

    const [events, setEvents] = useState();
    const [selectedCard, setSelectedCard] = useState(getOneCard(0, 'TODO'));
    const [visible, setVisible] = useState(false);

    const plannerId = quote[0];
    const cardStatusIndex = quote[1] ? quote[1] : 0;
    const cardStatus = cardStatusIndex ? (cardStatusIndex === 0 ? 'TODO' : cardStatusIndex === 1 ? 'DOING' : 'DONE') : 'TODO';

    useEffect(() => {
        const selectedEvents = getNestedElement(plannerList, quote);
        setEvents(dateParsing(selectedEvents));
    }, [plannerList, quote]);

    useEffect(() => {
        const selectedEvents = getNestedElement(plannerList, quote);
        setEvents(dateParsing(selectedEvents));
    }, [plannerList, quote]);

    const plannerUpdateCard = async (data) => {
        const { start, end, event } = data;
        const cardId = event.cardId;
        const startDate = start.toISOString();
        const endDate = end.toISOString();
        const card = events.find((e) => e.cardId === cardId);
        const requestData = {
            ...card,
            startDate,
            endDate,
            plannerId,
        };
        await patchCard(requestData);
        dispatch(
            plannerListActions.updateCard({
                cardId,
                startDate,
                endDate,
            })
        );
    };

    const onSelectSlot = async (slotInfo) => {
        const newEvent = getOneCard(events.length, cardStatus);

        delete newEvent.cardId;

        const startDate = moment(slotInfo.start).toDate().toISOString();
        const endDate = moment(slotInfo.end).toDate().toISOString();

        const requestData = {
            ...newEvent,
            plannerId,
            cardStatus,
            checklists: [{ checked: 0, title: 'done' }],
        };

        const res = await postCard(requestData);

        dispatch(
            plannerListActions.addCard({
                plannerId,
                cardStatusIndex,
                card: { ...newEvent, cardId: res.data.data, startDate, endDate },
            })
        );
    };

    const onSelectEvent = (event, e) => {
        setSelectedCard(event);
        setVisible(true);
    };

    return (
        <>
            <MDPModal selectedCard={selectedCard} modalStatus={visible} modalClose={() => setVisible(false)} />
            <DnDCalendar
                defaultDate={moment().toDate()}
                defaultView="month"
                startAccessor="startDate"
                endAccessor="endDate"
                events={events}
                localizer={localizer}
                onEventDrop={plannerUpdateCard}
                onEventResize={plannerUpdateCard}
                onSelectSlot={onSelectSlot}
                onSelectEvent={onSelectEvent}
                resizable
                selectable
                style={{ height: '100%', backgroundColor: 'white', flex: 2 }}
                eventPropGetter={eventStyleGetter}
                // components={{
                //   toolbar: CustomToolbar,
                // }}
            />
        </>
    );
}

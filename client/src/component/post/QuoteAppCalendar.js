import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { plannerListActions } from "../../store/plannerList";
import CalendarModal from "../home/calendar/CalendarModal";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { dateParsing, eventStyleGetter, getNestedElement } from "../../utils/CalendarController";
import { getOneCard } from "../../utils/QuoteSetting";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function QuoteAppCalendar() {
    const plannerList = useSelector( state => state.plannerList );
    const { quote } = useSelector( state => state.calendar );
    const dispatch = useDispatch();
  
    const [events, setEvents] = useState();
  
    useEffect(()=>{
      const selectedEvents = getNestedElement(plannerList,quote)
      setEvents(dateParsing(selectedEvents))
    },[ plannerList, quote ])
  
    const onEventResize = (data) => {
      const { start, end, event } = data;
    
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
            e.cardId === event.cardId ? { ...e, startDate:start, endDate:end } : e
        )
      );
    };
    
    const onEventDrop = (data) => {
      const { start, end, event } = data;
  
      dispatch(plannerListActions.updateCard({
        cardId: event.cardId,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      }))
    
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
            e.cardId === event.cardId ? { ...e, startDate:start, endDate:end } : e
        )
      );
    };
    
    const onSelectSlot = (slotInfo) => {
      const cardStatus = quote[1] ? quote[1] === 0 ? "TODO" : quote[1] === 1 ? "DOING" : "DONE" : "ERROR"
      const newEvent = getOneCard(events.length,cardStatus)

  
      const startDate = moment(slotInfo.start).toDate();
      const endDate = moment(slotInfo.end).toDate()
      
      if(plannerList.length === 0){
        dispatch(plannerListActions.addPlanner(
          {
            title: "default title",
            cards: [[{...newEvent,
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
            }],[],[]]
          }
        ))
      } else {
        dispatch(plannerListActions.addCard({
          id: quote[0],
          status: 0,
          card: {...newEvent,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          }
        }))
      }
      setEvents(prev => [...prev,{...newEvent,
        startDate,
        endDate,}]);
    };
  
    const onSelectEvent = (event, e) => {
      setSelectedCard(event);
      setVisible(true)
    };
  
    const [ selectedCard, setSelectedCard ] = useState(getOneCard(0,"TODO"));
  
    const [ visible, setVisible ] = useState(false);
  
    return (
      <>
        <CalendarModal
        selectedCard={selectedCard}
        modalStatus={visible}
        modalClose={()=>setVisible(false)}
        />
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          startAccessor="startDate"
          endAccessor="endDate"
          events={events}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
          resizable
          selectable
          style={{ height: "100vh" }}
          eventPropGetter={eventStyleGetter}
          // components={{
          //   toolbar: CustomToolbar,
          // }}
        />
      </>
    );
  };
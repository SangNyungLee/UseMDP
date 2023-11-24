import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { v4 } from "uuid";
import { plannerListActions } from "../../store/plannerList";
import CalendarModal from "../home/calendar/CalendarModal";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function QuoteAppCalendar() {
    const plannerList = useSelector( state => state.plannerList );
    const { quote } = useSelector( state => state.calendar );
    const dispatch = useDispatch();
  
    const [events, setEvents] = useState();
  
    useEffect(()=>{
      eventSetting(getNestedElement(plannerList,quote));
    },[ plannerList, quote ])
    
    const eventSetting = (totalPlanner) => {
      const newArr
      = totalPlanner.flat().map( e => ({ ...e,
          startDate: new Date(e.startDate),
          endDate: new Date(e.endDate)}));
      setEvents(newArr)
    }
  
  
    const getNestedElement = (array, indices) => {
      if(array.length === 0){
        return array;
      }
  
      let result = (array[indices[0]]).cards;
  
      switch (indices.length){
        case 0:
          return array.map( e => e.cards.flat());
        case 1:
          return result.flat();
        case 2:
          return result[indices[1]].flat();
        case 3:
          return [result[indices[1]][indices[2]]]
      }
    }
  
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
      const newEvent = {
        cardId : v4(),
        title: "default title",
        coverColor: "#FFD6DA",
        post: "",
        intOrder: 0,
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
      };
  
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
  
  
  
    const eventStyleGetter = (event, start, end, isSelected) => {
      var backgroundColor = event.coverColor;
      var style = {
          backgroundColor: backgroundColor,
          borderRadius: '0px',
          opacity: 0.8,
          color: 'black',
          border: '0px',
          display: 'block'
      };
      return {style};
    };
  
    const onSelectEvent = (event, e) => {
      // event: 클릭한 이벤트의 정보
      // e: 이벤트 객체
      setSelectedCard(event);
      setVisible(true)
    };
  
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
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { plannerListActions } from "../../../store/plannerList";
import CalendarModal from "./CalendarModal";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

// const CustomToolbar = ({ label, onNavigate }) => {
//   const goToToday = () => {
//     onNavigate("TODAY"); // 오늘 날짜로 이동
//   };

//   const goToNext = () => {
//     onNavigate("NEXT"); // 다음 달로 이동
//   };

//   const goToPrev = () => {
//     onNavigate("PREV"); // 이전 달로 이동
//   };

//   return (
//     <div>
//       <div style={{ textAlign: "center" }}>
//         <span>{label}</span>
//       </div>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <button onClick={goToPrev}>Back</button>
//         <button onClick={goToToday}>Today</button>
//         <button onClick={goToNext}>Next</button>
//       </div>
//     </div>
//   );
// };

export default function MyCalendar() {
  const plannerList = useSelector( state => state.plannerList );
  const { select } = useSelector( state => state.calendar );
  const dispatch = useDispatch();

  const [events, setEvents] = useState();

  useEffect(()=>{
    plannerListSetting(getNestedElement(plannerList,select));
  },[ plannerList, select ])
  
  const plannerListSetting = (totalPlanner) => {
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

    let result = (array[indices[0]]).dataContent;

    switch (indices.length){
      case 0:
        return array.map( e => e.dataContent.flat());
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

    dispatch(plannerListActions.updatePlanner({
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
      cardId: String(events.flat().length + 1),
      title: `New Event ${events.flat().length + 1}`,
      post:'',
      coverColor:'#87CEEB',
      todolist: [
        {
          "done": false
        },
        {
          "jpa": false
        }
      ],
      intOrder: 0,
      separatorPlan: "TODO",
      sourceResource: null,
    };

    const startDate = moment(slotInfo.start).toDate();
    const endDate = moment(slotInfo.end).toDate()
    
    if(plannerList.length === 0){
      dispatch(plannerListActions.addPlanner(
        {
          title: "default title",
          dataContent: [[{...newEvent,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          }],[],[]]
        }
      ))
    } else {
      dispatch(plannerListActions.addCard({
        id: select[0],
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
    cardId: "item-0-1700630974580-TODO",
    post: "",
    title: "title 0",
    coverColor: "#FFD6DA",
    startDate: "2023-10-01T15:00:00.000Z",
    endDate: "2023-10-04T15:00:00.000Z",
    todolist: [
      {
        "done": false
      },
      {
        "jpa": false
      }
    ],
    intOrder: 0,
    separatorPlan: "TODO",
    sourceResource: null
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


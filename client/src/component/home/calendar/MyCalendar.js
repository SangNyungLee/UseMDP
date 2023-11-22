import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";

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
  const plannerList = useSelector(state => state.plannerList);

  const [events, setEvents] = useState([
    {
      cardId: "1",
      startDate: moment().toDate().toISOString(),
      endDate: moment().add(1, "days").toDate().toISOString(),
      coverColor: "#FFD6DA",
      title: "Some title 1",
    },
    {
      cardId: "2",
      startDate: moment().add(2, "days").toDate().toISOString(),
      endDate: moment().add(3, "days").toDate().toISOString(),
      coverColor: "orange",
      title: "Some title 2",
    },
  ]);

  console.log(events);

  useEffect(()=>{
    if(plannerList.length>0){
      console.log(true)
      const newArr
      = plannerList.map( e => e.dataContent.flat())
        .flat().map( e => ({ ...e,
          startDate: new Date(e.startDate),
          endDate: new Date(e.endDate)}));
      setEvents(newArr)
    }
  },[plannerList])

  const onEventResize = (data) => {
    const { start, end, event } = data;
  
    setEvents((prevEvents) =>
      prevEvents.map((ev) =>
          ev.cardId === event.cardId ? { ...ev, startDate:start, endDate:end } : ev
      )
    );
  };
  
  const onEventDrop = (data) => {
    const { start, end, event } = data;
  
    setEvents((prevEvents) =>
      prevEvents.map((ev) =>
          ev.cardId === event.cardId ? { ...ev, startDate:start, endDate:end } : ev
      )
    );
  };
  
  const onSelectSlot = (slotInfo) => {
    console.log(slotInfo);
    const newEvent = {
      cardId: String(events.flat().length + 1),
      startDate: moment(slotInfo.start).toDate(),
      endDate: moment(slotInfo.end).toDate(),
      title: `New Event ${events.flat().length + 1}`,
      coverColor:'skyblue',
    };
  
    setEvents(prev => [...prev,newEvent]);
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
    console.log("Selected Event:", event);
  };

  return (
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
  );
};


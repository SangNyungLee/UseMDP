import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title 1",
    },
    {
      id: 2,
      start: moment().add(2, "days").toDate(),
      end: moment().add(3, "days").toDate(),
      title: "Some title 2",
    },
  ]);

  const onEventResize = (data) => {
    const { start, end, event } = data;

    setEvents((prevEvents) =>
      prevEvents.map((ev) =>
        ev.id === event.id ? { ...ev, start, end } : ev
      )
    );
  };

  const onEventDrop = (data) => {
    const { start, end, event } = data;

    setEvents((prevEvents) =>
      prevEvents.map((ev) =>
        ev.id === event.id ? { ...ev, start, end } : ev
      )
    );
  };

  const onSelectSlot = (slotInfo) => {
    const newEvent = {
      id: events.length + 1,
      start: slotInfo.start,
      end: slotInfo.end,
      title: `New Event ${events.length + 1}`,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onSelectSlot={onSelectSlot}
        resizable
        selectable
        style={{ height: "100vh" }}
        // components={{
        //   toolbar: CustomToolbar,
        // }}
      />
  );
};

export default MyCalendar;

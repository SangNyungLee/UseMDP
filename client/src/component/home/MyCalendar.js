import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { plannerListActions } from "../../store/plannerList";
import CalendarModal from "./calendar/CalendarModal";

import CalendarSideBar from "./calendar/CalendarSideBar";

import { v4 as uuidv4, v4 } from 'uuid';
import axios from "axios";

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
  const { home } = useSelector( state => state.calendar );
  const site = useSelector( state => state.site );
  const dispatch = useDispatch();

  const [events, setEvents] = useState();

  useEffect(()=>{
    eventSetting(getNestedElement(plannerList,home));
  },[ plannerList, home ])
  
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
      cardStatus: home[1] ? home[1] === 0 ? "TODO" : home[1] === 1 ? "DOING" : "DONE" : "ERROR",
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
        id: home[0],
        status: home[1] ? home[1] : 0,
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

  const [ test, setTest ] = useState();

  const testLogin = () => {
    const loginAxios = async () => {
      const result = await axios({
        method:"POST",
        url:"http://localhost:8080/api/postMember",
        data:{
          socialId:0,
          socialNickname:"aymrm",
        },
      })
      console.log("login",result)
    }
    loginAxios();
  }


  console.log("test",test)

  return (
    <>
      <CalendarSideBar/>
      <button onClick={testLogin}>테스트 로그인</button>
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


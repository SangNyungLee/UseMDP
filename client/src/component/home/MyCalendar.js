import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { plannerListActions } from "../../store/plannerList";
import MDPModal from "../modal/MDPModal";

import axios from "axios";
import {
  eventStyleGetter,
  getNestedElement,
} from "../../utils/CalendarController";
import { getOneCard } from "../../utils/QuoteSetting";
import { dateParsing } from "../../utils/DataParsing";
import useDefaultCheck from "../../hook/useDefaultCheck";
import CalendarSideBar from "./calendar/CalendarSideBar";
import styled from "styled-components";
import CalendarSelect from "./calendar/CalendarSelect";
import { getPlannerId, patchCard, postCard } from '../../utils/DataAxios';
import { calendarActions } from '../../store/calendar';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const _Container = styled.div`
  display: flex;
  z-index: 100;
`;

const _Toolbar = styled.div`
  width: 55vw;
  margin-bottom: 10px;
  @media screen and (max-width: 1300px) {
    & {
      width: 65vw;
    }
  }
`;

const _ToGoButton = styled.div`
  border: none;
  background: none;
  font-size: 20px;

  &:hover {
    cursor: pointer;
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

const _Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CustomToolbar = ({ label, onNavigate, onView, onDrillDown }) => {
  const goToToday = (e) => {
    e.stopPropagation();
    onNavigate("TODAY"); // 오늘 날짜로 이동
  };

  const goToNext = (e) => {
    e.stopPropagation();
    onNavigate("NEXT"); // 다음 달로 이동
  };

  const goToPrev = (e) => {
    e.stopPropagation();
    onNavigate("PREV"); // 이전 달로 이동
  };

  const switchToMonthView = (e) => {
    e.stopPropagation();
    onView("month"); // 주 단위(view)로 전환
  };

  const switchToWeekView = (e) => {
    e.stopPropagation();
    onView("week"); // 주 단위(view)로 전환
  };

  const switchToDayView = (e) => {
    e.stopPropagation();
    onView("day"); // 날짜 단위(view)로 전환
  };

  const switchToAgendaView = (e) => {
    e.stopPropagation();
    onView("agenda"); // 날짜 단위(view)로 전환
  };

  return (
    <_Toolbar>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "10px",
        }}
      >
        <_ToGoButton onClick={(e) => goToPrev(e)}>{"<"}</_ToGoButton>
        <div onClick={(e) => goToToday(e)} style={{ textAlign: "center" }}>
          <_Label>{label}</_Label>
        </div>
        <_ToGoButton onClick={(e) => goToNext(e)}>{">"}</_ToGoButton>
      </div>
      <CalendarSelect />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <_SwitchButton onClick={(e) => switchToMonthView(e)}>
          Month
        </_SwitchButton>
        <_SwitchButton onClick={(e) => switchToWeekView(e)}>Week</_SwitchButton>
        <_SwitchButton onClick={(e) => switchToDayView(e)}>Day</_SwitchButton>
        <_SwitchButton onClick={(e) => switchToAgendaView(e)}>
          Agenda
        </_SwitchButton>
      </div>
    </_Toolbar>
  );
};

export default function MyCalendar() {
    //지금은 상위꺼를 가져오는데, myPlanner만 가져오는 식으로.
    const plannerList = useSelector((state) => state.plannerList);
    const { home } = useSelector((state) => state.calendar);
    const site = useSelector((state) => state.site);

    const plannerId = home[0];
    const cardStatusIndex = home[1] ? home[1] : 0;
    const cardStatus = cardStatusIndex ? (cardStatusIndex === 0 ? 'TODO' : cardStatusIndex === 1 ? 'DOING' : 'DONE') : 'TODO';

  useDefaultCheck();

  const [events, setEvents] = useState();
  const [selectedCard, setSelectedCard] = useState(getOneCard(0, "TODO"));
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(plannerList, home);
    const selectedEvents = getNestedElement(plannerList, home);
    const parsedEvents = dateParsing(selectedEvents);
    console.log("parsedEvents",parsedEvents)
    setEvents(parsedEvents);
  }, [plannerList, home]);

    const plannerUpdateCard = async (data) => {
        const { start, end, event } = data;

        const cardId = event.cardId
        const startDate = start.toISOString()
        const endDate = end.toISOString()
        const card = events.find( e => e.cardId === cardId )

        const requestData = {
            ...card,
            startDate,
            endDate,
            plannerId,
            checklists: [{ title: 'done', checked:0 }]
        }

        const res = await patchCard(requestData);

        console.log("patch res",res)

        dispatch(
            plannerListActions.updateCard({
                cardId,
                startDate,
                endDate,
            })
        );

        // setEvents((prevEvents) => prevEvents.map((e) => (e.cardId === event.cardId ? { ...e, startDate: start, endDate: end } : e)));
    };

    console.log("test",plannerList)

    const onSelectSlot = async (slotInfo) => {
        const newEvent = getOneCard(events.length, cardStatus);
        
        delete newEvent.cardId
        delete newEvent.startDate
        delete newEvent.endDate

        const startDate = moment(slotInfo.start).toISOString();
        const endDate = moment(slotInfo.end).toISOString();

        console.log("slotInfo start",slotInfo.start)
        console.log("startDate",startDate)
        console.log("slotInfo end",slotInfo.end)
        console.log("endDate",endDate);
        
        if (plannerList.length === 0) {
            const newPlannerData = {
                creator: 'default creator',
                title: 'default title',
                thumbnail: '',
                plannerAccess: 'PUBLIC',
            }
            const getPlannerIdData = await getPlannerId(newPlannerData)
            const newPlannerId = getPlannerIdData.data
            const newCardData = {
                ...newEvent,
                plannerId: newPlannerId,
                startDate,
                endDate,
                cardStatus,
                checklists:[{checked:0,title:'done'}]
            }
            const newCardId = await postCard(newCardData)

            dispatch(
                plannerListActions.addPlanner({
                    ...newPlannerData,
                    plannerId: newPlannerId,
                    cards: [
                        [
                            {
                                ...newEvent,
                                cardId: newCardId.data.data,
                                startDate,
                                endDate,
                            },
                        ],
                        [],
                        [],
                    ],
                })
                );
            dispatch(
                calendarActions.setHome([newPlannerId])
            )
        } else {
            const requestData = {
                ...newEvent,
                plannerId,
                cardStatus,
                startDate,
                endDate,
                checklists:[{checked:0,title:'done'}]
            }
    
            const res = await postCard(requestData);
            dispatch(
                plannerListActions.addCard({
                    plannerId,
                    cardStatusIndex,
                    card: {
                        ...newEvent,
                        cardId: res.data.data,
                        startDate,
                        endDate,
                    },
                })
            );
        }
        // setEvents((prev) => [...prev, { ...newEvent, startDate, endDate }]);
    };

  const onSelectEvent = (event, e) => {
    setSelectedCard(event);
    setVisible(true);
  };

  console.log("events",events)

  return (
    <_Flex>
      <_Container>
        <CalendarSideBar />
        {/* <div>
        <button onClick={testLogin}>테스트 로그인</button>
        <button onClick={createPlanner}>플래너 생성</button>
        <button onClick={defaultPlanner}>기본 플래너 조회</button>
      </div> */}
        <MDPModal
          selectedCard={selectedCard}
          modalStatus={visible}
          modalClose={() => setVisible(false)}
        />
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
          style={{
            flex: 1,
            height: "80vh",
          }}
          eventPropGetter={eventStyleGetter}
          components={{
            toolbar: CustomToolbar,
          }}
        />
      </_Container>
    </_Flex>
  );
}

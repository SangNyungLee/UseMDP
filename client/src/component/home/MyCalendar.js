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

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const _Container = styled.div`
  display: flex;
`;

const _Toolbar = styled.div`
  width: 70vw;
  margin-bottom: 10px;
  @media screen and (max-width: 1200px) {
    & {
      width: 60vw;
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
  display: flex;
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
  const plannerList = useSelector((state) => state.plannerList);
  const { home } = useSelector((state) => state.calendar);
  const site = useSelector((state) => state.site);

  useDefaultCheck();

  const [events, setEvents] = useState();
  const [selectedCard, setSelectedCard] = useState(getOneCard(0, "TODO"));
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(plannerList, home);
    const selectedEvents = getNestedElement(plannerList, home);
    setEvents(dateParsing(selectedEvents));
  }, [plannerList, home]);

  const plannerUpdateCard = (data) => {
    const { start, end, event } = data;

    dispatch(
      plannerListActions.updateCard({
        cardId: event.cardId,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      })
    );

    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.cardId === event.cardId ? { ...e, startDate: start, endDate: end } : e
      )
    );
  };

  const onSelectSlot = (slotInfo) => {
    const plannerId = home[0];

    const cardStatusIndex = home[1] ? home[1] : 0;
    const cardStatus = cardStatusIndex
      ? cardStatusIndex === 0
        ? "TODO"
        : cardStatusIndex === 1
        ? "DOING"
        : "DONE"
      : "TODO";

    const newEvent = getOneCard(events.length, cardStatus);

    const startDate = moment(slotInfo.start).toDate();
    const endDate = moment(slotInfo.end).toDate();

    if (plannerList.length === 0) {
      dispatch(
        plannerListActions.addPlanner({
          plannerId: 0,
          title: "default title",
          cards: [
            [
              {
                ...newEvent,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
              },
            ],
            [],
            [],
          ],
        })
      );
    } else {
      dispatch(
        plannerListActions.addCard({
          plannerId,
          cardStatusIndex,
          card: {
            ...newEvent,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        })
      );
    }
    setEvents((prev) => [...prev, { ...newEvent, startDate, endDate }]);
  };

  const onSelectEvent = (event, e) => {
    setSelectedCard(event);
    setVisible(true);
  };

  const testLogin = () => {
    const loginAxios = async () => {
      const result = await axios({
        method: "POST",
        url: "http://localhost:8080/api/postMember",
        data: {
          socialId: 0,
          socialNickname: "aymrm",
        },
      });
      console.log("login", result);
    };
    loginAxios();
  };

  const createPlanner = () => {
    const creator = "aymrm";
    const title = "적당한 이름";
    const thumbnail = "적당한 문자열";
    const plannerIdAxios = async () => {
      const plannerId = await axios({
        method: "POST",
        url: "http://localhost:8080/api/postPlanner",
        data: {
          creator,
          title,
          thumbnail,
        },
        withCredentials: true,
      });
      console.log("plannerId", plannerId);

      // const result = await axios({
      //   method:"POST",
      //   url:"http://localhost:8080/api/postCard",
      //   data:{
      //     plannerId,
      //     creator,
      //     title,
      //     thumbnail,
      //   },
      //   withCredentials:true,
      // })
    };
    plannerIdAxios();
  };

  const defaultPlanner = () => {
    const defaultPlannerAxios = async () => {
      const result = await axios({
        method: "GET",
        url: "http://localhost:8080/api/getPlanner/default",
      });
      console.log("defaultPlanner", result);
    };
    defaultPlannerAxios();
  };

  return (
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
  );
}

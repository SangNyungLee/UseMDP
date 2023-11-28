import { Outlet } from "react-router";
import "../constant/css/index.css";
import styled from "styled-components";
import CalendarSideBar from "../component/home/calendar/CalendarSideBar";
import Header from "../component/Header";

const _Font = styled.div`
  font-family: "SUITE-Regular";
`;

const _Flex = styled.div`
  display: flex;
  justify-content: center;
`;

export default function HomePage() {
  return (
    <_Font>
      <Header />
      <div>HomePage</div>
      <_Flex>
        <Outlet />
      </_Flex>
    </_Font>
  );
}

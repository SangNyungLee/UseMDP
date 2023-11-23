import { Outlet } from "react-router";
import HomeSideBar from "../component/home/HomeSideBar";
import "../constant/css/index.css";
import styled from "styled-components";

const _Font = styled.div`
  font-family: "SUITE-Regular";
`;

export default function HomePage() {
  return (
    <_Font>
      <div>HomePage</div>
      <div style={{ display: "flex" }}>
        <HomeSideBar />
        <Outlet />
      </div>
    </_Font>
  );
}

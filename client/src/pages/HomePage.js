import { Outlet } from "react-router";
import HomeSideBar from "../component/home/HomeSideBar";
import "../constant/css/index.css";
import styled from "styled-components";

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
      <div>HomePage</div>
      <_Flex>
        <HomeSideBar />
        <Outlet />
      </_Flex>
    </_Font>
  );
}

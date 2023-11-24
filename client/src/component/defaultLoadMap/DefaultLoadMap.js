// import DefaultLoadMap from '../component/home/DefaultLoadMap';
// import Header from "../Header";
import HomeHeader from "../HomeHeader";
import { useState } from "react";
import DefaultComponent from "./DefaultComponent";
import StarComponent from "../starComponent/StarComponent";
import HomeComponent from "../homeComponent/HomeComponent";
import MyCalendar from "../home/calendar/MyCalendar";
import styled from "styled-components";
import SearchComponent from "../searchComponent/SearchComponent";

const _Button = styled.button`
  border: none;
  background: none;
  /* color: gray; */

  /* &:active {
    color: black;
  }
  &:focus {
    color: black;
  } */
`;

const _Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

const _FlexNavi = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  align-items: flex-start;
`;

const _RenderComponent = styled.div`
  z-index: 50;
`;

export default function DefaultLoadMap() {
  const [menuNumber, setMenuNumber] = useState();
  const [isActive, setIsActive] = useState(false);
  const renderComponent = () => {
    switch (menuNumber) {
      case 1:
        return <DefaultComponent />;
      case 2:
        return <StarComponent />;
      case 3:
        return <HomeComponent />;
      case 4:
        return <MyCalendar />;
      case 5:
        return <SearchComponent />;
      default:
        return <HomeComponent />;
    }
  };
  const handleNumber = (number) => {
    setMenuNumber(number);
  };

  return (
    <>
      <HomeHeader />
      <_Flex>
        <_FlexNavi>
          <_Button className="default" onClick={() => handleNumber(1)}>
            <i class="material-icons" style={{ fontSize: "40px" }}>
              description
            </i>
          </_Button>
          <_Button className="default" onClick={() => handleNumber(2)}>
            <i class="material-icons" style={{ fontSize: "40px" }}>
              star
            </i>
          </_Button>
          <_Button className="default" onClick={() => handleNumber(3)}>
            <i class="material-icons" style={{ fontSize: "40px" }}>
              account_circle
            </i>
          </_Button>
          <_Button className="default" onClick={() => handleNumber(4)}>
            <i class="material-icons" style={{ fontSize: "40px" }}>
              calendar_month
            </i>
          </_Button>
          <_Button className="default" onClick={() => handleNumber(5)}>
            <i class="material-icons" style={{ fontSize: "40px" }}>
              search
            </i>
          </_Button>
        </_FlexNavi>
        <_RenderComponent>{renderComponent()}</_RenderComponent>
      </_Flex>
    </>
  );
}

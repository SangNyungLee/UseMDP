// import DefaultLoadMap from '../component/home/DefaultLoadMap';
// import Header from "../Header";
import HomeHeader from "../../home/HomeHeader";
import { useState } from "react";
import DefaultComponent from "./DefaultComponent";
import StarComponent from "../../home/starComponent/StarComponent";
import MyCalendar from "../../home/MyCalendar";
import styled from "styled-components";
import SearchComponent from "../../home/searchComponent/SearchComponent";
import HomeComponent from "../../home/HomeComponent";
import {
  PiMapTrifoldFill,
  PiFireBold,
  PiCalendarBlankFill,
} from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { HiTable, HiUser, HiViewBoards } from "react-icons/hi";

const iconStyle = {
  fontSize: "2rem",
};

const _Button = styled.button`
  border: none;
  background: none;
  margin: 20px 0 20px 0;
`;

const _Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 80px;
  padding-left: 20%;
`;

const _SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  width: 300px;
  min-width: 300px;
  height: 100vh;
  background-color: whitesmoke;
  padding-left: 8%;
`;

const _Sidebar = styled.div`
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  left: 0;
  height: 100%;
`;

const _SidebarBtnContainer = styled.div``;

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
  const handleNumber = (e, number) => {
    e.stopPropagation();
    setMenuNumber(number);
  };

  return (
    <>
      <HomeHeader />
      <_SidebarContainer>
        <_Sidebar>
          <div>
            <_Button className="default" onClick={(e) => handleNumber(e, 1)}>
              <PiMapTrifoldFill style={iconStyle} />
              Get Started
            </_Button>
          </div>
          <div>
            <_Button className="default" onClick={(e) => handleNumber(e, 2)}>
              <PiFireBold style={iconStyle} />
              Trending
            </_Button>
          </div>
          <div>
            <_Button className="default" onClick={(e) => handleNumber(e, 3)}>
              <FaUserCircle style={iconStyle} />
              My Collection
            </_Button>
          </div>
          <div>
            <_Button className="default" onClick={(e) => handleNumber(e, 4)}>
              <PiCalendarBlankFill style={iconStyle} />
              Calendar
            </_Button>
          </div>
          <div>
            <_Button className="default" onClick={(e) => handleNumber(e, 5)}>
              <IoSearch style={iconStyle} />
              Search
            </_Button>
          </div>
        </_Sidebar>
      </_SidebarContainer>
      <_Flex>
        <_RenderComponent>{renderComponent()}</_RenderComponent>
      </_Flex>
    </>
  );
}

// export default function DefaultLoadMap() {
//   const [menuNumber, setMenuNumber] = useState();
//   const renderComponent = () => {
//       switch (menuNumber) {
//           case 1:
//               return <HomeComponent />;
//           case 2:
//               return <DefaultComponent />;
//           case 3:
//               return <StarComponent />;
//           case 4:
//               return <MyCalendar />;
//           case 5:
//               return <SearchComponent />;
//           default:
//               return <HomeComponent />;
//       }
//   };
//   const handleNumber = (number) => {
//       setMenuNumber(number);
//   };

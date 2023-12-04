// import DefaultLoadMap from '../component/home/DefaultLoadMap';
// import Header from "../Header";
import HomeHeader from '../../home/HomeHeader';
import { useState } from 'react';
import DefaultComponent from './DefaultComponent';
import StarComponent from '../../home/starComponent/StarComponent';
import MyCalendar from '../../home/MyCalendar';
import styled from 'styled-components';
import SearchComponent from '../../home/searchComponent/SearchComponent';
import HomeComponent from '../../home/HomeComponent';
import { NavLink, useNavigate } from 'react-router-dom';

// 서타일

<<<<<<< HEAD
import { _Container, _Row, _SidebarCol, _RenderComponentCol, _RenderComponent } from '../../../constant/css/styledComponents/__DefaultLoadMap';
=======
import { _RenderComponent } from "../../../constant/css/styledComponents/__DefaultLoadMap";
>>>>>>> develop

import { PiMapTrifoldFill, PiFireBold, PiCalendarBlankFill } from 'react-icons/pi';
import { FaUserCircle } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';

// 아이콘 서타일
import { HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { getMyPlanner } from '../../../utils/DataAxios';

//사이드바 css
import '../../../constant/css/sidebar.css';

const iconStyle = {
    fontSize: '2rem',
};

export default function DefaultLoadMap() {
  const [menuNumber, setMenuNumber] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
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

  const clickLogo = (e) => {
    e.stopPropagation();
    navigate("/");
  };

  return (
    <>
      <aside className="sidebar">
        <nav className="menu">
          <div
            className="side-logo"
            onClick={(e) => {
              clickLogo(e);
            }}
          >
            <img src="/images/004.png" className="side-logo-img" />
          </div>
          <a
            className={`menu__item ${
              menuNumber === 1 ? "menu__item--active" : ""
            }`}
            onClick={(e) => handleNumber(e, 1)}
          >
            <i className="menu__icon fa fa-home"></i>
            <span className="menu__text">시작</span>
          </a>
          <a
            className={`menu__item ${
              menuNumber === 2 ? "menu__item--active" : ""
            }`}
            onClick={(e) => handleNumber(e, 2)}
          >
            <i className="menu__icon fa fa-envelope"></i>
            <span className="menu__text">인기</span>
          </a>
          <a
            className={`menu__item ${
              menuNumber === 3 ? "menu__item--active" : ""
            }`}
            onClick={(e) => handleNumber(e, 3)}
          >
            <i className="menu__icon fa fa-list"></i>
            <span className="menu__text">플래너</span>
          </a>
          <a
            className={`menu__item ${
              menuNumber === 4 ? "menu__item--active" : ""
            }`}
            onClick={(e) => handleNumber(e, 4)}
          >
            <i className="menu__icon fa fa-calendar"></i>
            <span className="menu__text">캘린더</span>
          </a>
          <a
            className={`menu__item ${
              menuNumber === 5 ? "menu__item--active" : ""
            }`}
            onClick={(e) => handleNumber(e, 5)}
          >
            <i className="menu__icon fa fa-bar-chart"></i>
            <span className="menu__text">검색</span>
          </a>
          <a className="menu__item">
            <i className="menu__icon fa fa-trophy"></i>
            <span className="menu__text">성과</span>
          </a>
          <a className="menu__item">
            <i className="menu__icon fa fa-sliders"></i>
            <span className="menu__text">통계</span>
          </a>
        </nav>
        {/* <div className="copyright">copyright &copy; 2018</div> */}
      </aside>
      <_RenderComponent fluid={"xs"}>{renderComponent()}</_RenderComponent>
    </>
  );
}

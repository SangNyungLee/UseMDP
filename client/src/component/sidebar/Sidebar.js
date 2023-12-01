import React from "react";
import "../../constant/css/sidebar.css";
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">logo</div>
      <div className="avatar">
        <div className="avatar__img">
          <img src="https://picsum.photos/70" alt="avatar" />
        </div>
        <div className="avatar__name">John Smith</div>
      </div>
      <nav className="menu">
        <a className="menu__item" href="#">
          <i className="menu__icon fa fa-home"></i>
          <span className="menu__text">overview</span>
        </a>
        <a className="menu__item" href="#">
          <i className="menu__icon fa fa-envelope"></i>
          <span className="menu__text">messages</span>
        </a>
        <a className="menu__item" href="#">
          <i className="menu__icon fa fa-list"></i>
          <span className="menu__text">workout</span>
        </a>
        <a className="menu__item menu__item--active" href="#">
          <i className="menu__icon fa fa-calendar"></i>
          <span className="menu__text">calendar</span>
        </a>
        <a className="menu__item" href="#">
          <i className="menu__icon fa fa-bar-chart"></i>
          <span className="menu__text">goals</span>
        </a>
        <a className="menu__item" href="#">
          <i className="menu__icon fa fa-trophy"></i>
          <span className="menu__text">achievements</span>
        </a>
        <a className="menu__item" href="#">
          <i className="menu__icon fa fa-sliders"></i>
          <span className="menu__text">measurements</span>
        </a>
      </nav>
      <div className="copyright">copyright &copy; 2018</div>
    </aside>
  );
};

export default Sidebar;

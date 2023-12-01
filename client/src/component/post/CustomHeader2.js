import React from "react";
import {
  FaTrello,
  FaSearch,
  FaPlus,
  FaInfo,
  FaBell,
  FaStar,
  FaLock,
  FaLockOpen,
  FaEllipsisH,
  FaDownload,
  FaUser,
  FaArrowLeft,
} from "react-icons/fa";
import "../../constant/css/customHeader2.css";
import { NavLink, useNavigate } from "react-router-dom";
function CustomHeader2() {
  const navigate = useNavigate();
  const clickLogo = (e) => {
    navigate("/");
  };

  return (
    <div className="nav-main">
      <div className="nav-bar">
        <div className="left-bar">
          {/* <button type="button" className="button-style" onClick={(e) => clickLogo(e)}> */}
          {/* <FaTrello style={{ fontSize: '16px', color: 'white', marginBottom: '6px' }} /> */}
          {/* <img src="/images/005.png" className="logo-style" /> */}
          {/* </button> */}

          {/* <button type="button" className="button-style">
            <FaSearch className="search-icon " />
          </button> */}
          <button type="button" className="button-style-header">
            <FaArrowLeft style={{ fontSize: "16px", color: "white" }} />
          </button>
        </div>

        <div className="right-bar">
          <button type="button" className="button-style-right">
            <FaPlus style={{ fontSize: "16px", color: "white" }} />
          </button>

          <button type="button" className="button-style-right">
            <FaDownload style={{ fontSize: "16px", color: "white" }} />
          </button>

          <button type="button" className="button-style-right">
            <FaUser style={{ fontSize: "16px", color: "white" }} />
          </button>
        </div>
      </div>

      <div className="content-header">
        <button type="button" className="button-style-header">
          <span
            className="main-board"
            style={{ color: "white" }}
            contentEditable
          >
            타이틀
          </span>
        </button>

        <button type="button" className="button-style-header">
          <FaStar style={{ fontSize: "12px", color: "white" }} />
        </button>

        <button type="button" className="button-style-header">
          <FaLock
            style={{ fontSize: "12px", color: "white", marginRight: "5px" }}
          />
          <span className="private-text">Private</span>
        </button>

        <button type="button" className="button-style-header">
          <FaLockOpen
            style={{ fontSize: "12px", color: "white", marginRight: "5px" }}
          />
          <span className="private-text">Public</span>
        </button>
      </div>

      <div className="content-header-right">
        <button type="button" className="button-style-header-right">
          <FaEllipsisH style={{ fontSize: "12px", color: "white" }} />
          <span className="menu-text">Show menu</span>
        </button>
      </div>
    </div>
  );
}

export default CustomHeader2;

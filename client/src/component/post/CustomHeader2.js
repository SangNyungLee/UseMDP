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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { plannerListActions } from "../../store/plannerList";
import { patchPlanner } from "../../utils/DataAxios";
import DataDownload from "../../utils/DataDownload";
function CustomHeader2(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const plannerInfo = props.plannerInfo;
  console.log("프롭스", props.plannerInfo);

  const handleBlur = async (e) => {
    const data = {
      ...plannerInfo,
      title: e.target.innerText,
    };
    const res = await patchPlanner(data);
    console.log("title 수정", res);
    dispatch(
      plannerListActions.updatePlannerTitle({
        plannerId: plannerInfo.plannerId,
        title: e.target.innerText,
      })
    );
  };
  const handlePublic = async () => {
    const data = {
      ...plannerInfo,
      plannerAccess: "PUBLIC",
    };
    console.log("handlepublic", data);
    const res = await patchPlanner(data);
    dispatch(
      plannerListActions.updatePlannerAccess({
        plannerId: plannerInfo.plannerId,
        plannerAccess: "PUBLIC",
      })
    );
  };

  const handlePrivate = async () => {
    const data = {
      ...plannerInfo,
      plannerAccess: "PRIVATE",
    };
    console.log("handlepublic", data);
    const res = await patchPlanner(data);
    dispatch(
      plannerListActions.updatePlannerAccess({
        plannerId: plannerInfo.plannerId,
        plannerAccess: "PRIVATE",
      })
    );
  };

  const homeNavigate = () => {
    navigate(-1);
  };

  const handleDownLoad = async () => {
    DataDownload(plannerInfo.title);
  };

  const Addplanner = () => {};
  return (
    <div className="nav-main">
      <div className="nav-bar">
        <div className="left-bar">
          <button
            onClick={homeNavigate}
            type="button"
            className="button-style-2"
          >
            <FaArrowLeft
              style={{ fontSize: "16px", color: "white", marginBottom: "6px" }}
            />
            {/* <span className="text-style">로고자리</span> */}
          </button>

          {/* <button type="button" className="button-style">
            <FaSearch className="search-icon " />
          </button> */}
        </div>

        <div className="right-bar">
          <button
            onClick={Addplanner}
            type="button"
            className="button-style-right"
          >
            <FaPlus style={{ fontSize: "16px", color: "white" }} />
          </button>

          <button
            onClick={handleDownLoad}
            type="button"
            className="button-style-right"
          >
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
            onBlur={(e) => {
              handleBlur(e);
            }}
          >
            {plannerInfo.title}
          </span>
        </button>

        <button type="button" className="button-style-header">
          <FaStar style={{ fontSize: "12px", color: "white" }} />
        </button>

        <button
          onClick={handlePrivate}
          type="button"
          className="button-style-header"
        >
          <FaLock
            style={{ fontSize: "12px", color: "white", marginRight: "5px" }}
          />
          <span className="private-text">Private</span>
        </button>

        <button
          onClick={handlePublic}
          type="button"
          className="button-style-header"
        >
          <FaLockOpen
            style={{ fontSize: "12px", color: "white", marginRight: "5px" }}
          />
          <span className="private-text">Public</span>
        </button>
      </div>

      <div className="content-header-right">
        <button
          type="button"
          onClick={() => {
            props.setSwitch((prev) => {
              return prev == 0 ? 1 : 0;
            });
          }}
          className="button-style-header-right"
        >
          <FaEllipsisH style={{ fontSize: "12px", color: "white" }} />
          <span className="menu-text">Switch</span>
        </button>
      </div>
    </div>
  );
}

export default CustomHeader2;

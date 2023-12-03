import React from "react";
import styled from "styled-components";
import star from "../../constant/img/star.png";
import yellowStar from "../../constant/img/yellowStar.png";
import axios from "axios";
import { useState } from "react";
import { deletePlannerUnlike, postPlannerLike } from "../../utils/DataAxios";
import { useDispatch } from "react-redux";
import { likeActions } from "../../store/like";
import { requestFail } from "../etc/SweetModal";

const _Star = styled.img`
  width: 23px;
  height: 23px;
  margin-right: 2px;
  z-index: 5;
`;

const LikeButton = (props) => {
  const plannerId = props.plannerId;
  const isLike = props.isLike;

  const dispatch = useDispatch();

  console.log("like button",isLike)

  const isStarCilckLike = async (e) => {
    e.stopPropagation();
    dispatch(likeActions.addPlannerLike(plannerId))
    const res = await postPlannerLike(plannerId);
    if(res.status !== 200){
      requestFail("플래너 좋아요");
    }
  };

  const isStarCilckUnLike = async (e) => {
    e.stopPropagation();
    dispatch(likeActions.delPlannerLike(plannerId))
    const res = await deletePlannerUnlike(plannerId);
    if(res.status !== 200){
      requestFail("플래너 좋아요 삭제")
    }
  };

  return (
    <>
      { isLike ? 
          <_Star src={yellowStar} onClick={(e) => isStarCilckUnLike(e)}></_Star>
          :
          <_Star src={star} onClick={(e) => isStarCilckLike(e)}></_Star>
       }
    </>
  );
};

export default LikeButton;

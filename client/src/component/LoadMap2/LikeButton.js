import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLike, removeLike } from "../../store/like";
import styled from "styled-components";
import star from "../../constant/img/star.png";
import yellowStar from "../../constant/img/yellowStar.png";
import axios from "axios";

const _Star = styled.img`
  width: 23px;
  height: 23px;
  margin-right: 2px;
  z-index: 5;
`;

const LikeButton = ({ plannerId }, like) => {
  console.log("likebutton의 like" + like);
  const isLiked = like.some((like) => like.plannerId === plannerId);
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);

  const isStarCilckLike = (e) => {
    e.preventDefault();
    isLiked = 1;
    dispatch(addLike({ plannerId }));
    const res = axios.post(
      "http://localhost:8080/api/postPlanner/like",
      {
        plannerId,
      },
      { withCredentials: true }
    );
    console.log(res);
  };

  const isStarCilckUnLike = (e) => {
    e.preventDefault();
    isLiked = 0;
    setIsLike(false);
    dispatch(removeLike({ plannerId }));
    const res = axios.patch(
      "http://localhost:8080/api/patchPlanner/unlike",
      {
        plannerId,
      },
      { withCredentials: true }
    );
  };

  return (
    <>
      {isLiked ? (
        <_Star src={yellowStar} onClick={(e) => isStarCilckUnLike(e)}></_Star>
      ) : (
        <_Star src={star} onClick={(e) => isStarCilckLike(e)}></_Star>
      )}
    </>
  );
};

export default LikeButton;

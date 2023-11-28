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

const LikeButton = (props) => {
  // console.log("likebutton의 like" + JSON.stringify(like));
  // const isLiked = like.some((like) => like.plannerId === plannerId);
  const dispatch = useDispatch();
  const [isLiked, setIsLike] = useState(false);

  const plannerId = props.plannerId;
  const like = props.like;

  const isStarCilckLike = () => {
    // isLiked = 1;
    // setIsLike(true);
    // dispatch(addLike({ plannerId }));
    const res = axios.post(
      "http://localhost:8080/api/postPlanner/like",
      {
        plannerId,
      },
      { withCredentials: true }
    );
    console.log(res);
  };

  const isStarCilckUnLike = () => {
    //isLiked = 0;
    // setIsLike(false);
    // dispatch(removeLike({ plannerId }));
    const res = axios.delete("http://localhost:8080/api/patchPlanner/unlike", {
      data: { plannerId },
      withCredentials: true,
    });
    console.log(res);
  };

  return (
    <>
      {like ? (
        <_Star src={yellowStar} onClick={() => isStarCilckUnLike()}></_Star>
      ) : (
        <_Star src={star} onClick={() => isStarCilckLike()}></_Star>
      )}
    </>
  );
};

export default LikeButton;

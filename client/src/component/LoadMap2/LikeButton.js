import React from "react";
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
`;

const LikeButton = ({ plannerId, memberId }) => {
  const likedPlanners = useSelector((state) => state.like.likedPlanners);
  const isLiked = likedPlanners.some(
    (like) => like.plannerId === plannerId && like.memberId === memberId
  );
  const dispatch = useDispatch();

  const isStarCilckLike = () => {
    dispatch(addLike({ plannerId, memberId }));
    const res = axios.post("http://localhost:8080/api/postPlanner/like", {
      plannerId: plannerId,
      memberId: 1,
    });
  };

  const isStarCilckUnLike = () => {
    dispatch(removeLike({ plannerId, memberId }));
    const res = axios.patch("http://localhost:8080/api/patchPlanner/unlike", {
      plannerId: plannerId,
      memberId: 1,
    });
  };

  return (
    <>
      {isLiked ? (
        <_Star src={yellowStar} onClick={isStarCilckUnLike}></_Star>
      ) : (
        <_Star src={star} onClick={isStarCilckLike}></_Star>
      )}
    </>
  );
};

export default LikeButton;

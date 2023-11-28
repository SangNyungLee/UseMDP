import React from "react";
import styled from "styled-components";
import star from "../../constant/img/star.png";
import yellowStar from "../../constant/img/yellowStar.png";
import axios from "axios";
import { useState } from "react";

const _Star = styled.img`
  width: 23px;
  height: 23px;
  margin-right: 2px;
  z-index: 5;
`;

const LikeButton = (props) => {
  const plannerId = props.plannerId;
  const like = props.like;

  const [isClick, setIsClick] = useState(false);
  const [isLike, setIsLike] = useState(true);

  // if (like === 1) {
  //   setIsClick(true);
  // }

  const isStarCilckLike = async (e) => {
    e.stopPropagation();
    setIsClick(true);
    setIsLike(true);
    const res = await axios.post(
      "http://localhost:8080/api/postPlanner/like",
      {
        plannerId,
      },
      { withCredentials: true }
    );
    console.log(res);
  };

  const isStarCilckUnLike = async (e) => {
    e.stopPropagation();
    setIsClick(false);
    setIsLike(false);
    const res = await axios.delete(
      "http://localhost:8080/api/patchPlanner/unlike",
      {
        data: { plannerId },
        withCredentials: true,
      }
    );
    console.log(res);
  };

  return (
    <>
      {/* {state && like ? (
        <_Star src={yellowStar} onClick={(e) => isStarCilckUnLike(e)}></_Star>
      ) : (
        <_Star src={star} onClick={(e) => isStarCilckLike(e)}></_Star>
      )} */}
      {like ? (
        isLike ? (
          <_Star src={yellowStar} onClick={(e) => isStarCilckUnLike(e)}></_Star>
        ) : (
          <_Star src={star} onClick={(e) => isStarCilckLike(e)}></_Star>
        )
      ) : isClick ? (
        <_Star src={yellowStar} onClick={(e) => isStarCilckUnLike(e)}></_Star>
      ) : (
        <_Star src={star} onClick={(e) => isStarCilckLike(e)}></_Star>
      )}
    </>
  );
};

export default LikeButton;

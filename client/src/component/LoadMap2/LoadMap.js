import { Container, Image, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { calendarActions } from "../../store/calendar";
import { useDispatch } from "react-redux";
import LikeButton from "./LikeButton";
import styled from "styled-components";
import { plannerListActions } from "../../store/plannerList";
import { async } from "q";

const _Container = styled.div`
  margin-bottom: 20px;
  width: fit-content;
`;

const _ImageStyle = styled.img`
  width: 230px;
  height: 150px;
  border-radius: 5px;
`;

const _TitleStyle = styled.div`
  font-size: 23px;
  margin-left: 2px;
`;

const _DescriptionStyle = styled.span`
  font-size: 17px;
  color: #8f8f8f;
  margin-left: 2px;
`;

const _Felx = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const _Star = styled.img`
  width: 23px;
  height: 23px;
  margin-right: 2px;
`;

export default function LoadMap2(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    plannerId,
    title,
    creator,
    likePlanner,
    thumbnail,
    createAt,
    description,
  } = props.datas;
  const like = props.likes;

  console.log("loadmap 의 like" + like);

<<<<<<< HEAD
  const handleClick = async () => {
    const btoaId = btoa(plannerId);
    const result = await axios(
      `http://localhost:8080/api/getPlanner/${btoaId}`
=======
    const isStarCilck = async (e) => {
        e.stopPropagation();
        //Star에 따라서, +를 보내줄지, -를 보내줄지 결정하자.
        //StarClick= true 이미 좋아요 한 상태의므로

        if (starClick) {
            //unlike
            const res = await axios.patch('http://localhost:8080/api/patchPlanner/unlike', { plannerId: plannerId });
            console.log('StarClick', res);
        } else {
            const res = await axios.patch('http://localhost:8080/api/patchPlanner/like', { plannerId: plannerId });
            console.log('StarClick', res);
        }
        setStarClick(!starClick);
    };

    return (
        <_Container onClick={handleClick}>
            {/* 추천할때 추천 수 올라가는 로직, 애니메이션 필요 */}
            <_ImageStyle src={thumbnail}></_ImageStyle>
            <div>
                <_Felx>
                    <_TitleStyle>{title}</_TitleStyle>
                    {starClick ? <_Star src={yellowStar} onClick={(e) => isStarCilck(e)}></_Star> : <_Star src={star} onClick={(e) => isStarCilck(e)}></_Star>}
                </_Felx>
                <_DescriptionStyle>{description}</_DescriptionStyle>
            </div>
        </_Container>
>>>>>>> develop
    );
    console.log(result.data);
    dispatch(calendarActions.setQuote([plannerId]));
    dispatch(plannerListActions.setPlannersInit(result.data));
    navigate(`/planner?id=${btoaId}`);
  };

  return (
    <_Container onClick={handleClick}>
      <_ImageStyle src={thumbnail}></_ImageStyle>
      <div>
        <_Felx>
          <_TitleStyle>{title}</_TitleStyle>

          <LikeButton plannerId={plannerId} like={like} />
        </_Felx>
        <_DescriptionStyle>{description}</_DescriptionStyle>
      </div>
    </_Container>
  );
}

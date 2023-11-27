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
  // console.log(props);

  const handleClick = async () => {
    const btoaId = btoa(plannerId);
    const result = await axios(
      `http://localhost:8080/api/getPlanner/${btoaId}`
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
          <LikeButton plannerId={plannerId} />
        </_Felx>
        <_DescriptionStyle>{description}</_DescriptionStyle>
      </div>
    </_Container>
  );
}

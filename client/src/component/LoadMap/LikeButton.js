import React from 'react';
import styled from 'styled-components';
import star from '../../constant/img/star.png';
import yellowStar from '../../constant/img/yellowStar.png';
import axios from 'axios';
import { useState } from 'react';
import { deletePlannerUnlike, postPlannerLike } from '../../utils/DataAxios';
import { useDispatch } from 'react-redux';
import { likeActions } from '../../store/like';
import { FaRegStar } from 'react-icons/fa';

const _Star = styled.img`
    position: absolute;
    color: yellow;
    right: 0px;
    bottom: 10px;
    width: 23px;
    height: 23px;
    margin-right: 2px;
    z-index: 5;
`;
const _FaStar = styled(FaRegStar)`
    position: absolute;
    color: #fcd703;
    right: 0px;
    bottom: 10px;
    width: 23px;
    height: 23px;
    margin-right: 2px;
    z-index: 5;
`;

const _FaStar2 = styled(FaRegStar)`
    position: absolute;
    color: #d3d3d3;
    right: 0px;
    bottom: 10px;
    width: 23px;
    height: 23px;
    margin-right: 2px;
    z-index: 5;
`;
const LikeButton = (props) => {
    const plannerId = props.plannerId;
    const isLike = props.isLike;

    const dispatch = useDispatch();

    console.log('like button', isLike);

    const isStarCilckLike = async (e) => {
        e.stopPropagation();
        postPlannerLike(plannerId);
        dispatch(likeActions.addPlannerLike(plannerId));
    };

    const isStarCilckUnLike = async (e) => {
        e.stopPropagation();
        deletePlannerUnlike(plannerId);
        dispatch(likeActions.delPlannerLike(plannerId));
    };

    return <>{isLike ? <_FaStar onClick={(e) => isStarCilckUnLike(e)}></_FaStar> : <_FaStar2 onClick={(e) => isStarCilckLike(e)}></_FaStar2>}</>;
};

export default LikeButton;
{
    /*  */
    // ;
}

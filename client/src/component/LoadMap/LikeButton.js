import React from 'react';
import styled from 'styled-components';
import star from '../../constant/img/star.png';
import yellowStar from '../../constant/img/yellowStar.png';
import { deletePlannerUnlike, postPlannerLike } from '../../utils/DataAxios';
import { useDispatch } from 'react-redux';
import { likeActions } from '../../store/like';
import { FaRegStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { requestFail } from '../etc/SweetModal';

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
    const likes = useSelector((state) => state.like);
    const plannerId = props.plannerId;
    const isLike = likes.includes(plannerId);
    const dispatch = useDispatch();

    const isStarCilckLike = async (e) => {
        e.stopPropagation();
        const isLiked = likes.some((like) => like === plannerId);
        if (isLiked) {
            requestFail('좋아요 추가', '이미 존재하는 좋아요');
            return;
        } else {
            dispatch(likeActions.addPlannerLike(plannerId));
            const res = await postPlannerLike(plannerId);
            if (res.status !== 200) {
                requestFail('플래너 좋아요');
            }
            return;
        }
    };

    const isStarCilckUnLike = async (e) => {
        e.stopPropagation();
        const isLiked = likes.some((like) => like === plannerId);
        if (isLiked) {
            dispatch(likeActions.delPlannerLike(plannerId));
            const res = await deletePlannerUnlike(plannerId);
            if (res.status !== 200) {
                requestFail('플래너 좋아요 삭제');
            }
            return;
        } else {
            requestFail('좋아요 취소', '좋아요가 되어있지 않아요');
            return;
        }
    };

    return <>{isLike ? <_Star src={yellowStar} onClick={(e) => isStarCilckUnLike(e)}></_Star> : <_Star src={star} onClick={(e) => isStarCilckLike(e)}></_Star>}</>;
};

export default LikeButton;
{
    /*<>{isLike ? <_FaStar onClick={(e) => isStarCilckUnLike(e)}></_FaStar> : <_FaStar2 onClick={(e) => isStarCilckLike(e)}></_FaStar2>}</>;  */
    // ;
}

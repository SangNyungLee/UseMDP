import styled from 'styled-components';
import star from '../../constant/img/star.png';
import yellowStar from '../../constant/img/yellowStar.png';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { calendarActions } from '../../store/calendar';
import { plannerListActions } from '../../store/plannerList';
import { useDispatch } from 'react-redux';
import LikeButton from './LikeButton';
import { postPlannerLike } from '../../utils/DataAxios';
import skyImg from '../../constant/img/sky.jpg';
import {
    _CardContainer,
    _CardHeader,
    _CardFooter,
    _CardImg,
    _CardImgOverlay,
    _CardBody,
    _CardTitle,
    _CardSubtitle,
    _CardText,
    _CardLink,
    _CardDownloadButton,
    _CardEditButton,
    _IconContainer,
    _LockedIcon,
    _UnlockedIcon,
    _DownloadIcon,
    _EditIcon,
} from '../../constant/css/styledComponents/__MyLoadMap';
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

export default function LoadMap(props) {
    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);

    const { plannerId, title, creator, likePlanner, thumbnail, createAt, description } = props.datas;
    // console.log(props);
    const isLike = props.isLike;

    const handleClick = (e) => {
        e.stopPropagation();
        const btoaId = btoa(plannerId);
        navigate(`/plannerNoEdit?id=${btoaId}`);
    };

    return (
        <>
            <_CardContainer text="white" onClick={(e) => handleClick(e)} onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <_CardImg src={thumbnail ? thumbnail : skyImg} alt="planner thumbnail" />
                <_CardImgOverlay>
                    <_CardBody>
                        <_CardTitle as={'h5'}>{title}</_CardTitle>
                    </_CardBody>
                </_CardImgOverlay>
                <LikeButton plannerId={plannerId} isLike={isLike} />
            </_CardContainer>
        </>
    );
}

// const handleClick = async (e) => {
//     e.stopPropagation();
//     const fetchData = async (btoaId) => {
//         return await axios(`http://localhost:8080/api/getPlanner/${btoaId}`);
//     };
//     const btoaId = btoa(plannerId);
//     const result = await fetchData(btoaId);
//     const cardList = result.data.data.cards;
//     const cards = [[], [], []];
//     for (let i = 0; i < cardList.length; i++) {
//         if (cardList[i].cardStatus === 'TODO') {
//             cards[0].push(cardList[i]);
//         } else if (cardList[i].cardStatus === 'DOING') {
//             cards[1].push(cardList[i]);
//         } else if (cardList[i].cardStatus === 'DONE') {
//             cards[2].push(cardList[i]);
//         }
//     }
//     navigate(`/plannerNoEdit?id=${btoaId}`);
// };
{
    /* <_Container onClick={(e) => handleClick(e)}>
<_ImageStyle src={thumbnail ? thumbnail : skyImg}></_ImageStyle>
<div>
    <_Felx>
        <_TitleStyle>{title}</_TitleStyle>

        <LikeButton plannerId={plannerId} isLike={isLike} />
    </_Felx>
    <_DescriptionStyle>{description}</_DescriptionStyle>
</div>
</_Container> */
}

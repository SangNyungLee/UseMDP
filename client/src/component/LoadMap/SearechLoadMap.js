import { useState } from 'react';
import { useNavigate } from 'react-router';
import LikeButton from './LikeButton';
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
} from '../../constant/css/styledComponents/__SearchLoadMap';

export default function SearchLoadMap(props) {
    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);

    const { plannerId, title, creator, likePlanner, thumbnail, createAt, description } = props.datas;

    const isLike = props.isLike;

    const handleClick = (e) => {
        e.stopPropagation();
        const btoaId = btoa(plannerId);
        navigate(`/plannerNoEdit?id=${btoaId}`);
    };

    return (
        <>
            <_CardContainer text="white" onClick={(e) => handleClick(e)} onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <_CardImg src={thumbnail && thumbnail != 'string' ? thumbnail : skyImg} alt="planner thumbnail" />
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

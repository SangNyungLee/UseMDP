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
} from '../../constant/css/styledComponents/__MyLoadMap';

export default function LoadMap(props) {
    const navigate = useNavigate();

    const { plannerId, title } = props.datas;

    const isLike = props.isLike;

    const handleClick = (e) => {
        e.stopPropagation();
        const btoaId = btoa(plannerId);
        navigate(`/plannerNoEdit?id=${btoaId}`);
    };

    return (
        <>
            <_CardContainer text="white" onClick={(e) => handleClick(e)}>
                <_CardImg src={skyImg} alt="planner thumbnail" />
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
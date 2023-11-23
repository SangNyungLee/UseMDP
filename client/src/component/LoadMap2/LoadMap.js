import { Container, Image, Row, Col, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import star from '../../constant/img/star.png';
import yellowStar from '../../constant/img/yellowStar.png';
import { useState } from 'react';
import { useNavigate } from 'react-router';
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
    const { plannerId, title, creator, likePlanner, thumbnail, createAt, description } = props.datas;
    // console.log(props);
    const navigate = useNavigate();
    const handleClick = () => {
        const btoaId = btoa(plannerId);
        // Initialize an array with three empty subarrays
        navigate(`/planner?id=${btoaId}`);
    };
    const [starClick, setStarClick] = useState(false);

    const isStarCilck = (e) => {
        e.stopPropagation();
        setStarClick(!starClick);
    };

    return (
        <_Container onClick={handleClick}>
            {/* <Image src={thumbnail}></Image>
      <Row>
        <Col>
          <h3>{title}</h3>
          <span>{description}</span>
        </Col>
        <Col>{creator}</Col>
      </Row> */}

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
    );
}

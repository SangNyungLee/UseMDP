import { Container, Image, Row, Col, Card, Button } from "react-bootstrap";
import styled from "styled-components";
import star from "../../constant/img/star.png";
import yellowStar from "../../constant/img/yellowStar.png";
import Share from "../../constant/img/share.png";
import { useState } from "react";

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

const _Share = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 2px;
`;

const _isOpen = styled.div`
  color: #198754;
  font-weight: bolder;
  margin-left: 2px;
`;

const _Button = styled.button`
  border: none;
  background-color: #198754;
  color: white;
  width: 60px;
  height: 30px;
  border-radius: 2px;
  font-size: 14px;
  margin-right: 2px;
`;

export default function MyLoadMap(props) {
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

  const [starClick, setStarClick] = useState(false);

  const isStarCilck = () => {
    setStarClick(!starClick);
  };

  return (
    <_Container>
      {/* <Image src={thumbnail}></Image>
      <Row>
        <Col>
          <h3>{title}</h3>
          <span>{description}</span>
        </Col>
        <Col>{creator}</Col>
      </Row> */}

      <_ImageStyle src={thumbnail}></_ImageStyle>
      <div>
        <_Felx>
          <_TitleStyle>{title}</_TitleStyle>
          <_Share src={Share}></_Share>
        </_Felx>
        <_DescriptionStyle>{description}</_DescriptionStyle>
        <_Felx>
          <_isOpen>PRIVATE</_isOpen>
          <_Button>수정</_Button>
        </_Felx>
      </div>
    </_Container>
  );
}

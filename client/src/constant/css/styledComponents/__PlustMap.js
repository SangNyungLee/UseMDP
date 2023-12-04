import styled from "styled-components";
import {
  Row,
  Col,
  Stack,
  Container,
  Nav,
  Navbar,
  Button,
  Card,
} from "react-bootstrap";

import { FaPlus } from "react-icons/fa6";

export const _cardContainer = styled(Card)`
  border: 2px solid #202a45;
  border-radius: 5px;
  cursor: pointer;
  /* background-color: #202a45; */
  background: none;
  margin: 5%;
  height: 120px;
`;

export const _cardBody = styled(Card.Body)`
  padding: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const _cardImgOverlay = styled(Card.ImgOverlay)``;

export const _cardImg = styled(Card.Img)``;

export const _plusButton = styled(Button)``;

export const _plusIcon = styled(FaPlus)`
  color: #202a45;
`;

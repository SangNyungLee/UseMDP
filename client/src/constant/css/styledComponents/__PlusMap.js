import styled from 'styled-components';
import { Row, Col, Stack, Container, Nav, Navbar, Button, Card } from 'react-bootstrap';

import { FaPlus } from 'react-icons/fa6';

export const _CardContainer = styled(Card)`
	border: none;
	cursor: pointer;
	background-color: grey;
	margin: 5%;
	width: 240px;
	height: 120px;
`;

export const _CardBody = styled(Card.Body)`
	width: auto;
	height: 100%;
	padding: 4%;
`;

export const _CardImgOverlay = styled(Card.ImgOverlay)``;

export const _CardImg = styled(Card.Img)``;

export const _PlusButton = styled(Button)``;

export const _PlusIcon = styled(FaPlus)``;

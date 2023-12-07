import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaPlus } from 'react-icons/fa6';

export const _CardContainer = styled(Card)`
	border: none;
	cursor: pointer;
	border-radius: 3px;
	width: 240px;
	height: 120px;
	opacity: 0.5;
	background-color: grey;
	&:hover {
		opacity: 0.8;
	}
`;

export const _CardBody = styled(Card.Body)`
	padding: 4%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const _CardText = styled(Card.Text)``;

export const _CardImgOverlay = styled(Card.ImgOverlay)``;

export const _CardImg = styled(Card.Img)``;

export const _PlusButton = styled(Button)``;

export const _PlusIcon = styled(FaPlus)``;

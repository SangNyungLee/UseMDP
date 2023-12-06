import styled from 'styled-components';
import { Card } from 'react-bootstrap';

import styled from 'styled-components';
import { Button, Card } from 'react-bootstrap';
import { IoMdLock, IoMdUnlock, IoMdDownload } from 'react-icons/io';
import { LiaEdit } from 'react-icons/lia';

export const _CardContainer = styled(Card)`
	border: none;
	cursor: pointer;
	border-radius: 3px;
	padding: 0;
	width: 240px;
	height: 120px;
	max-width: 240px;
	max-height: 120px;
	min-width: 240px;
	min-height: 120px;
	aspect-ratio: 2 / 1;
`;

export const _CardImg = styled(Card.Img)`
	border-radius: 3px;
	border: none;
	width: 240px;
	height: 120px;
	max-width: 240px;
	max-height: 120px;
	min-width: 240px;
	min-height: 120px;
`;

export const _CardImgOverlay = styled(Card.ImgOverlay)`
	border-radius: 3px;
	border: none;
	width: 240px;
	height: 120px;
	max-width: 240px;
	max-height: 120px;
	min-width: 240px;
	min-height: 120px;
	padding: 0;

	&:hover {
		box-shadow: inset 0px 0px 20px 100px rgba(0, 0, 0, 0.1);
	}
`;

export const _CardBody = styled(Card.Body)`
	border-radius: 3px;
	border: none;
	padding: 4% 0 0 5%;
`;

export const _CardTitle = styled(Card.Title)`
	font-size: 1rem;
	color: whitesmoke;
`;

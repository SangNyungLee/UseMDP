import styled from 'styled-components';
import { Button, Card } from 'react-bootstrap';
import { IoMdLock, IoMdUnlock, IoMdDownload } from 'react-icons/io';
import { LiaEdit } from 'react-icons/lia';

export const _CardContainer = styled(Card)`
	border: none;
	margin: 5%;
	cursor: pointer;
	width: 240px;
	height: 120px;
`;

export const _CardHeader = styled(Card.Header)``;

export const _CardFooter = styled(Card.Footer)``;

export const _CardImg = styled(Card.Img)`
	width: 240px;
	height: 120px;
	filter: blur(0 px);
	-webkit-filter: blur(0px);

	&:hover {
		filter: none;
		-webkit-filter: none;
	}
`;

export const _CardImgOverlay = styled(Card.ImgOverlay)`
	width: 240px;
	height: 120px;
	padding: 0;
`;

export const _CardBody = styled(Card.Body)`
	padding: 4%;
`;

export const _CardTitle = styled(Card.Title)``;

export const _CardSubtitle = styled(Card.Subtitle)``;

export const _CardText = styled(Card.Text)``;

export const _CardLink = styled(Card.Link)``;

export const _CardDownloadButton = styled(Button)`
	padding: 0;
	margin: 0;
	position: absolute;
	bottom: 4%;
	right: 4%;
`;

export const _CardEditButton = styled(Button)`
	padding: 0;
	margin: 0;
	position: absolute;
	top: 4%;
	right: 3%;
`;

export const _LockedIcon = styled(IoMdLock)`
	font-size: 1.2rem;
	cursor: text;
`;

export const _UnlockedIcon = styled(IoMdUnlock)`
	font-size: 1.2rem;
`;

export const _DownloadIcon = styled(IoMdDownload)`
	color: white;
	font-size: 1.2rem;

	&:hover {
		scale: 1.1;
	}
`;

export const _EditIcon = styled(LiaEdit)`
	color: white;
	font-size: 1.2rem;

	&:hover {
		scale: 1.1;
	}
`;

export const _IconContainer = styled.div`
	position: absolute;
	bottom: 4%;
	left: 4%;
`;

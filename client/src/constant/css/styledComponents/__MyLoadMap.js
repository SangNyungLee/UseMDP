import styled from 'styled-components';
import { Button, Card } from 'react-bootstrap';
import { IoMdLock, IoMdUnlock, IoMdDownload } from 'react-icons/io';
import { LiaEdit } from 'react-icons/lia';

export const _cardContainer = styled(Card)`
	border: none;
	cursor: pointer;
	margin: 5%;
	height: 120px;
`;

export const _cardHeader = styled(Card.Header)``;

export const _cardFooter = styled(Card.Footer)``;

export const _cardImg = styled(Card.Img)`
	filter: blur(0px);
	-webkit-filter: blur(0px);

	&:hover {
		filter: none;
		-webkit-filter: none;
	}
`;

export const _cardImgOverlay = styled(Card.ImgOverlay)`
	padding: 0;
`;

export const _cardBody = styled(Card.Body)`
	padding: 4%;
`;

export const _cardTitle = styled(Card.Title)``;

export const _cardSubtitle = styled(Card.Subtitle)``;

export const _cardText = styled(Card.Text)``;

export const _cardLink = styled(Card.Link)``;

export const _cardDownloadButton = styled(Button)`
	padding: 0;
	margin: 0;
	position: absolute;
	bottom: 4%;
	right: 4%;
`;

export const _cardEditButton = styled(Button)`
	padding: 0;
	margin: 0;
	position: absolute;
	top: 4%;
	right: 3%;
`;

export const _lockedIcon = styled(IoMdLock)`
	font-size: 1.2rem;
	cursor: text;
`;

export const _unlockedIcon = styled(IoMdUnlock)`
	font-size: 1.2rem;
`;

export const _downloadIcon = styled(IoMdDownload)`
	color: white;
	font-size: 1.2rem;

	&:hover {
		scale: 1.1;
	}
`;

export const _editIcon = styled(LiaEdit)`
	color: white;
	font-size: 1.2rem;

	&:hover {
		scale: 1.1;
	}
`;

export const _iconContainer = styled.div`
	position: absolute;
	bottom: 4%;
	left: 4%;
`;

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import styled from 'styled-components';

export const _PageWrapper = styled(Container)`
	margin: 0;
	padding: 0;
	background-color: #eeeeee;
`;

export const _PageContainer = styled(Container)`
	display: flex;
	justify-content: center;
	margin-top: 4rem;
	padding: 8rem 0 10rem 0;
	background-color: #eeeeee;
	font-family: 'Roboto', sans-serif;
`;

export const _ButtonRow = styled(Row)`
	width: 80%;
	margin-top: 3rem;
	margin-bottom: 4rem;

	@media screen and (width <= 767px) {
		width: auto;
		justify-content: center;
	}
`;

export const _Row = styled(Row)`
	justify-content: space-evenly;
	padding: 0;
	width: 100vw;
	@media screen and (width <= 767px) {
		justify-content: center;
	}
`;

export const _StartButtonCol = styled(Col)`
	flex: 0 0;
`;

export const _FileInputButtonCol = styled(Col)`
	flex: 0 0;
`;

export const _LeftCol = styled(Col)`
	padding: 0 1rem 0 1rem;
`;

export const _RightCol = styled(Col)`
	max-width: 600px;
	flex: 1 0 auto;
	padding: 0 1rem 0 1rem;
`;

export const _ButtonContainer = styled(Container)`
	display: flex;
`;

export const _Title = styled.h1`
	font-weight: 600;
	color: #222831;

	@media screen and (width <= 767px) {
		text-align: center;
	}
`;

export const _Subtitle = styled.p`
	font-weight: 600;
	color: #393e46;

	@media screen and (width <= 767px) {
		text-align: center;
	}
`;

export const _Button = styled(Button)`
	color: #eeeeee;
	min-width: 100px;
	background-color: #222831;
	border: none;
	&:hover {
		background-color: #393e46;
	}
`;

export const _Image = styled(Image)`
	max-width: 100%;
`;

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
	min-width: 320px;

	@media screen and (width <= 576px) {
	}
`;

export const _PageContainer = styled(Container)`
	margin-top: 4rem;
	padding: 6rem 6rem 0 6rem;
	background-color: #eeeeee;
	min-width: 320px;
	min-height: 100vh;

	font-family: 'Roboto', sans-serif;

	@media screen and (width <= 576px) {
	}
`;

export const _ButtonRow = styled(Row)`
	width: 80%;
	margin-top: 4rem;
	margin-bottom: 4rem;

	@media screen and (width <= 767px) {
		width: 100%;
		justify-content: center;
	}
`;

export const _Row = styled(Row)``;

export const _StartButtonCol = styled(Col)`
	flex: 0 0;
`;

export const _FileInputButtonCol = styled(Col)`
	flex: 0 0;
`;

export const _LeftCol = styled(Col)`
	padding: 0;
`;

export const _RightCol = styled(Col)`
	padding: 0;
`;

export const _ButtonContainer = styled(Container)`
	display: flex;
`;

export const _Title = styled.h1`
	font-weight: 600;
	color: #222831;
`;

export const _Subtitle = styled.p`
	font-weight: 500;
	color: #393e46;
`;

export const _Button = styled(Button)`
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

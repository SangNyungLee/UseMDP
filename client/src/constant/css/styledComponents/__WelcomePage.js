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
	padding: 8rem 4rem 0 4rem;
	background-color: #eeeeee;
	min-width: 320px;
	min-height: 100vh;
	font-family: 'Roboto', sans-serif;
`;

export const _ButtonRow = styled(Row)`
	width: 80%;
	margin-top: 3rem;
	margin-bottom: 4rem;

	@media screen and (width <= 767px) {
		width: 100%;
		justify-content: center;
	}
`;

export const _Row = styled(Row)`
	justify-content: space-between;
`;

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
	max-width: 600px;
	flex: 1 0 auto;
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
	font-weight: 600;
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

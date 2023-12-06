import { Container, Image, Row, Col, Button, Stack } from 'react-bootstrap';
import styled from 'styled-components';

export const _PageWrapper = styled(Container)`
	width: 100vw;
	margin: 0;
	padding: 0;
	background-color: #eeeeee;
	max-width: none;
`;

export const _PageContainer = styled(Container)`
	padding: 14% 10% 0 10%;

	background-color: #eeeeee;
	font-family: 'Roboto', sans-serif;
	height: 100vh;
	max-width: none;
`;

export const _Row = styled(Row)``;

export const _LeftCol = styled(Col)``;

export const _RightCol = styled(Col)`
	display: flex;
	justify-content: center;
`;

export const _TitleStack = styled(Stack)``;

export const _ButtonStack = styled(Stack)`
	margin-bottom: 10%;
`;

export const _Title = styled.h1`
	font-weight: 600;
	color: #222831;
`;

export const _Subtitle = styled.p`
	font-weight: 500;
	color: #393e46;
`;

export const _Button = styled(Button)``;

export const _Image = styled(Image)`
    max-width: 100%;
`;

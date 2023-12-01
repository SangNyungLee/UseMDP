import styled from 'styled-components';
import { Row, Col, Stack, Container, Nav, Navbar, Button, Card } from 'react-bootstrap';

import { FaPlus } from 'react-icons/fa6';

export const _cardContainer = styled(Card)`
	border: none;
	cursor: pointer;
	background-color: antiquewhite;
`;

export const _cardBody = styled(Card.Body)`
	padding: 4%;
`;

export const _plusButton = styled(Button)``;

export const _plusIcon = styled(FaPlus)``;

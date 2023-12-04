import styled from 'styled-components';
import { Row, Col, Stack, Container, Nav, Navbar, Button } from 'react-bootstrap';

export const _Container = styled(Container)`
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
`;

export const _Row = styled(Row)`
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	justify-content: end;
`;

export const _SidebarCol = styled(Col)`
	padding: 0%;
`;

export const _RenderComponentCol = styled(Col)`
	flex-shrink: 0;
	padding: 0;
	margin: 0 0 0 9rem;
	height: 100%;
`;

export const _RenderComponent = styled(Container)`
	margin: 0 0 0 9rem;
	padding: 0;
	width: calc(100% - 9rem);
	background-color: whitesmoke;
`;

import styled from "styled-components";
import {
  Row,
  Col,
  Stack,
  Container,
  Nav,
  Navbar,
  Button,
} from "react-bootstrap";

export const _Container = styled(Container)`
	padding: 8% 0 0 0;
	margin: 0;
	height: 100%;
	width: 100%;
`;

export const _Row = styled(Row)`
	height: 100%;
`;

export const _SidebarCol = styled(Col)``;

export const _RenderComponentCol = styled(Col)`
  height: 100%;
`;

export const _RenderComponent = styled.div`
	height: 100%;
	z-index: 99;
`;

export const _Navbar = styled(Navbar)``;

export const _Nav = styled(Nav)``;

export const _NavItem = styled(Nav.Item)``;

export const _Button = styled(Button)``;

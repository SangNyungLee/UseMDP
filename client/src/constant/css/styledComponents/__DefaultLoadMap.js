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
  // padding: 8% 0 0 0;
  margin: 0;
  width: 100vw;
  height: 100%;
`;

export const _Row = styled(Row)`
  width: 100%;
  height: 100%;
`;

export const _SidebarCol = styled(Col)``;

export const _RenderComponentCol = styled(Col)`
  height: 100%;
`;

export const _RenderComponent = styled.div`
  z-index: 99;
`;

export const _Navbar = styled(Navbar)``;

export const _Nav = styled(Nav)``;

export const _NavItem = styled(Nav.Item)``;

export const _Button = styled(Button)``;

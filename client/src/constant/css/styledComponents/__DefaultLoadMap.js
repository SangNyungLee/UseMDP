import styled from "styled-components";
import {
  Row,
  Col,
  Container,
} from "react-bootstrap";


export const _Container = styled(Container)`
	// padding: 8% 0 0 0;
	margin: 0;
	width: 100vw;
	height: 100%;
	padding-top: 35px;
	overflow-y: hidden;
	overflow-x: hidden;
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

	@media screen and (max-width: 850px) {
		margin: 0 0 0 4rem;
		width: calc(100% - 4rem);
	}

	@media screen and (max-width: 575px) {
		margin: 6% 0 0 0;
		padding: 0 0 20% 0;
		width: 100%;
	}
`;

import styled from 'styled-components';
import { Row, Col, Stack, Container, Nav, Navbar, Button } from 'react-bootstrap';

// -------------------------------------------------

export const _RenderComponent = styled(Container)`
	margin: 0 0 0 9rem;
	padding: 0;
	width: calc(100% - 9rem);
	background-color: whitesmoke;

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

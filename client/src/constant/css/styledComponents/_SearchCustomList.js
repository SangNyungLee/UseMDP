import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export const _Container = styled(Container)`
	padding: 0;
	margin: 0;
	width: 100%;
	overflow-y: hidden;
`;

export const _Row = styled(Row)`
	justify-content: flex-start;
	padding: 0;
	margin: 0;

	@media screen and (max-width: 850px) {
	}

	@media screen and (max-width: 575px) {
		justify-content: center;
	}
`;
export const _Col = styled(Col)`
	padding: 0;
	margin: 0 3rem 3rem 0;
	width: 240px;
	height: 120px;
	max-width: 240px;
	max-height: 120px;
	min-width: 240px;
	min-height: 120px;

	@media screen and (max-width: 850px) {
	}

	@media screen and (max-width: 686px) {
		margin: 0 1rem 1rem 0;
	}

	@media screen and (max-width: 575px) {
	}
`;

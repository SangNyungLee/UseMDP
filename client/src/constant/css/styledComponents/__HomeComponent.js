import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const _ComponentContainer = styled(Container)`
	padding: 1rem 2rem 0 4rem;
	margin: 0;

	@media screen and (max-width: 850px) {
		padding: 1rem 4rem 0 6rem;
	}

	@media screen and (max-width: 815px) {
		padding: 1rem 0 0 2rem;
	}

	@media screen and (max-width: 686px) {
	}

	@media screen and (max-width: 622px) {
		padding: 1rem 0 0 1rem;
	}

	@media screen and (max-width: 575px) {
		padding: 1rem 0 0 0;
	}
`;

export const _ComponentTitle = styled.h1`
	color: #00adb5;
	font-size: 1.2rem;
	margin: 1rem 0 2rem 0;

	@media screen and (max-width: 575px) {
		margin: 1rem 0 2rem 3rem;
	}
`;

export const _TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const _FilterSelect = styled.select`
	margin: 1rem 0 0 0;
`;

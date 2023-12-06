import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const _RenderComponent = styled(Container)`
	width: calc(100% - 9rem);
	margin: 4rem 0 0 9rem;
	padding: 0;

	@media screen and (max-width: 850px) {
		margin: 4rem 0 0 4rem;
		width: calc(100% - 4rem);
	}

	@media screen and (max-width: 575px) {
		margin: 4rem 0 0 0;
		padding: 0 0 20% 0;
		width: 100%;
	}
`;

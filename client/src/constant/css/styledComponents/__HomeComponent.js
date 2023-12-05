import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const _ComponentContainer = styled(Container)`
    margin: 0;
    padding: 0;
`;

export const _ComponentTitle = styled.h1`
    color: #00adb5;
    font-size: 1.2rem;
    padding: 6% 0 2% 6%;
    margin: 0 0 0 0;
    @media (max-width: 768px) {
        margin: 50px 0 0 0;
    }

    @media (max-width: 992px) {
        margin: 30px 0 0 0;
    }
`;

import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';

export const _Container = styled(Container)`
    padding: 0;
    margin: 0;
    width: 100%;
`;
export const _Row = styled(Row)`
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
`;
export const _Col = styled(Col)`
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    padding: 0;

    margin: 0 3rem 3rem 0;
    width: 240px;
    height: 120px;
    min-width: 240px;
    min-height: 120px;
`;

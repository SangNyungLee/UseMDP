import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';

export const _Container = styled(Container)`
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: center;
`;
export const _Row = styled(Row)`
    width: 100%;
    height: 100%;
    padding: 0 3% 0 3%;
    margin: 0;
`;
export const _Col = styled(Col)`
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
`;

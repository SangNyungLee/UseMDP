import '../constant/css/index.css';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { pointActions } from '../store/pointer';
import QuoteAppOnlyRead from '../component/post/QuoteAppOnlyRead';

const _Font = styled.div`
    font-family: 'SUITE-Regular';
    height: 100vh;
`;

export default function PlannerNoEdit() {
    const dispatch = useDispatch();

    const handlePoint = (e) => {
        e.stopPropagation();
        dispatch(pointActions.clearPoint());
    };

    return (
        <_Font onClick={(e) => handlePoint(e)}>
            <QuoteAppOnlyRead />
        </_Font>
    );
}

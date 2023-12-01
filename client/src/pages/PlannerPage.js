import QuoteApp from '../component/post/QuoteApp';
import '../constant/css/index.css';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { pointActions } from '../store/pointer';

const _Font = styled.div`
    font-family: 'SUITE-Regular';
    height: 100vh;
`;

export default function PlannerPage() {
    const dispatch = useDispatch();

    const handlePoint = (e) => {
        e.stopPropagation();
        dispatch(pointActions.clearPoint());
    };

    return (
        <_Font onClick={(e) => handlePoint(e)}>
            <QuoteApp />
        </_Font>
    );
}

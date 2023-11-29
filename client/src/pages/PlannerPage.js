import QuoteApp from '../component/post/QuoteApp';
import '../constant/css/index.css';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { pointActions } from '../store/pointer';
const _Font = styled.div`
    font-family: 'SUITE-Regular';
`;

export default function PlannerPage() {
    const dispatch = useDispatch();
    const handlePoint = () => {
        dispatch(pointActions.clearPoint());
    };

    return (
        <_Font onClick={handlePoint}>
            <QuoteApp />
        </_Font>
    );
}

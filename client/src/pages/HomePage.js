import { Outlet } from 'react-router';
import '../constant/css/index.css';
import styled from 'styled-components';
import CalendarSideBar from '../component/home/calendar/CalendarSideBar';
import Header from '../component/Header';
import { useDispatch } from 'react-redux';
import { pointActions } from '../store/pointer';
import useDefaultCheck from '../hook/useDefaultCheck';
import { HOME } from '../constant/constant';
import { useSelector } from 'react-redux';
const _Font = styled.div`
    font-family: 'SUITE-Regular';
`;

const _Flex = styled.div`
    display: flex;
    justify-content: center;
`;

export default function HomePage() {
    const dispatch = useDispatch();

    const handlePoint = (e) => {
        e.stopPropagation()
        dispatch(pointActions.clearPoint());
    };

    return (
        <_Font onClick={ e => handlePoint(e)}>
            <Header />
            <div>HomePage</div>
            <_Flex>
                <Outlet />
            </_Flex>
        </_Font>
    );
}

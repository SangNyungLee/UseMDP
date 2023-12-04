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
import HomeHeader from '../component/home/HomeHeader';

import { _pageContainer } from '../constant/css/styledComponents/__HomePage';
import RealHeader from '../component/RealHeader';

const _Flex = styled.div`
    display: flex;
    justify-content: center;
`;

const _pageContainer = styled.div`
    height: 100vh;
    width: 100vw;
    font-family: 'Pretendard-Regular';
    margin: 0;
    padding: 0;
`;

export default function HomePage() {
    const dispatch = useDispatch();

    const handlePoint = (e) => {
        e.stopPropagation();
        dispatch(pointActions.clearPoint());
    };

    return (
        <_pageContainer id="HOMEPAGE" onClick={(e) => handlePoint(e)}>
            {/* <HomeHeader /> */}
            <RealHeader />
            <Outlet />
        </_pageContainer>
    );
}

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

const _Flex = styled.div`
	display: flex;
	justify-content: center;
`;

export default function HomePage() {
	const dispatch = useDispatch();

	const handlePoint = (e) => {
		e.stopPropagation();
		dispatch(pointActions.clearPoint());
	};

	return (
		<_pageContainer id='HOMEPAGE' onClick={(e) => handlePoint(e)}>
			<HomeHeader />
			<Outlet />
		</_pageContainer>
		// <_Font
		// 	id='HOMEPAGE'
		// 	onClick={(e) => handlePoint(e)}
		// 	style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
		// 	<HomeHeader />
		// 	<_Flex style={{ flex: 1 }}>
		// 		<Outlet />
		// 	</_Flex>
		// </_Font>
	);
}

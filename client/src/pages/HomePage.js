import { Outlet } from 'react-router';
import '../constant/css/index.css';
import { useDispatch } from 'react-redux';
import { pointActions } from '../store/pointer';

import { _PageContainer } from '../constant/css/styledComponents/__HomePage';
import RealHeader from '../component/RealHeader';
import { ThemeProvider } from 'react-bootstrap';

export default function HomePage() {
	const dispatch = useDispatch();

	const handlePoint = (e) => {
		e.stopPropagation();
		dispatch(pointActions.clearPoint());
	};

	return (
		<ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint='xxs'>
			<_PageContainer id='_PageContainer' onClick={(e) => handlePoint(e)} $fluid>
				<RealHeader />
				<Outlet />
			</_PageContainer>
		</ThemeProvider>
	);
}

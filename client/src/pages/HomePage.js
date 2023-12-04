import { Outlet } from 'react-router';
import '../constant/css/index.css';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { pointActions } from '../store/pointer';

import { _PageContainer } from '../constant/css/styledComponents/__HomePage';
import RealHeader from '../component/RealHeader';
import { ThemeProvider } from 'react-bootstrap';

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
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <_PageContainer id="HOMEPAGE" onClick={(e) => handlePoint(e)}>
        <RealHeader />
        <Outlet />
      </_PageContainer>
    </ThemeProvider>
  );
}

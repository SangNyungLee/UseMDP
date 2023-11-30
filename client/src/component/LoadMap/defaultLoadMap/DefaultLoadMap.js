// import DefaultLoadMap from '../component/home/DefaultLoadMap';
// import Header from "../Header";
import HomeHeader from '../../home/HomeHeader';
import { useState } from 'react';
import DefaultComponent from './DefaultComponent';
import StarComponent from '../../home/starComponent/StarComponent';
import MyCalendar from '../../home/MyCalendar';
import styled from 'styled-components';
import SearchComponent from '../../home/searchComponent/SearchComponent';
import HomeComponent from '../../home/HomeComponent';

// 서타일
import {
	_Container,
	_SidebarCol,
	_RenderComponentCol,
	_RenderComponent,
	_Navbar,
	_Nav,
	_NavItem,
	_Row,
	_Button,
} from '../../../constant/css/styledComponents/__DefaultLoadMap';
import { PiMapTrifoldFill, PiFireBold, PiCalendarBlankFill } from 'react-icons/pi';
import { FaUserCircle } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';

// 아이콘 서타일
import { HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { getMyPlanner } from '../../../utils/DataAxios';

const iconStyle = {
    fontSize: '2rem',
};
    
export default function DefaultLoadMap() {
    const [menuNumber, setMenuNumber] = useState();
    const [isActive, setIsActive] = useState(false);
    const renderComponent = () => {
        switch (menuNumber) {
            case 1:
                return <DefaultComponent />;
            case 2:
                return <StarComponent />;
            case 3:
                return <HomeComponent />;
            case 4:
                return <MyCalendar />;
            case 5:
                return <SearchComponent />;
            default:
                return <HomeComponent />;
        }
    };
    const handleNumber = (e, number) => {
		e.stopPropagation();
		setMenuNumber(number);
	};

	return (
		<>
			<HomeHeader />
			<_Container className='mt-5 pt-5 px-sm-5 justify-content-end'>
				<_Row>
					<_SidebarCol xs={12} sm={2} className='d-flex flex-row flex-sm-column flex-nowrap position-fixed'>
						<_Navbar>
							<_Container fluid>
								<_Nav className='d-flex flex-column'>
									<_NavItem className='flex-shrink-0 mb-4'>
										<_Button variant='none' className='default' onClick={(e) => handleNumber(e, 1)}>
											<PiMapTrifoldFill style={iconStyle} />
											Get Started
										</_Button>
									</_NavItem>
									<_NavItem className='flex-shrink-0 mb-4'>
										<_Button variant='none' className='default' onClick={(e) => handleNumber(e, 2)}>
											<PiFireBold style={iconStyle} />
											Trending
										</_Button>
									</_NavItem>
									<_NavItem className='flex-shrink-0 mb-4'>
										<_Button variant='none' className='default' onClick={(e) => handleNumber(e, 3)}>
											<FaUserCircle style={iconStyle} />
											My Collection
										</_Button>
									</_NavItem>
									<_NavItem className='flex-shrink-0 mb-4'>
										<_Button variant='none' className='default' onClick={(e) => handleNumber(e, 4)}>
											<PiCalendarBlankFill style={iconStyle} />
											Calendar
										</_Button>
									</_NavItem>
									<_NavItem className='flex-shrink-0 mb-4'>
										<_Button variant='none' className='default' onClick={(e) => handleNumber(e, 5)}>
											<IoSearch style={iconStyle} />
											Search
										</_Button>
									</_NavItem>
								</_Nav>
							</_Container>
						</_Navbar>
					</_SidebarCol>
					<_RenderComponentCol xs={12} sm={10}>
						<_RenderComponent>{renderComponent()}</_RenderComponent>
					</_RenderComponentCol>
				</_Row>
			</_Container>
		</>
	);
}

// export default function DefaultLoadMap() {
//   const [menuNumber, setMenuNumber] = useState();
//   const renderComponent = () => {
//       switch (menuNumber) {
//           case 1:
//               return <HomeComponent />;
//           case 2:
//               return <DefaultComponent />;
//           case 3:
//               return <StarComponent />;
//           case 4:
//               return <MyCalendar />;
//           case 5:
//               return <SearchComponent />;
//           default:
//               return <HomeComponent />;
//       }
//   };
//   const handleNumber = (number) => {
//       setMenuNumber(number);
//   };

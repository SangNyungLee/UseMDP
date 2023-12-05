import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultComponent from './DefaultComponent';
import StarComponent from '../../home/starComponent/StarComponent';
import MyCalendar from '../../home/MyCalendar';
import SearchComponent from '../../home/searchComponent/SearchComponent';
import HomeComponent from '../../home/HomeComponent';

// 서타일
import { _RenderComponent } from '../../../constant/css/styledComponents/__DefaultLoadMap';

//사이드바 css
import '../../../constant/css/sidebar.css';
import { HiTemplate } from 'react-icons/hi';
import { FaFire } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';

export default function DefaultLoadMap() {
	const [menuNumber, setMenuNumber] = useState(1);
	const navigate = useNavigate();
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

	const clickLogo = (e) => {
		e.stopPropagation();
		navigate('/');
	};

	return (
		<>
			<aside className='sidebar' id='Sidebar'>
				<nav className='menu'>
					<div
						className='side-logo'
						onClick={(e) => {
							clickLogo(e);
						}}>
						<img src='/images/004.png' className='side-logo-img' />
					</div>
					<a
						className={`menu__item ${menuNumber === 1 ? 'menu__item--active' : ''}`}
						onClick={(e) => handleNumber(e, 1)}>
						<HiTemplate className='menu__icon' />
						<span className='menu__text'>기본</span>
					</a>
					<a
						className={`menu__item ${menuNumber === 2 ? 'menu__item--active' : ''}`}
						onClick={(e) => handleNumber(e, 2)}>
						<FaFire className='menu__icon' />
						<span className='menu__text'>인기</span>
					</a>
					<a
						className={`menu__item ${menuNumber === 3 ? 'menu__item--active' : ''}`}
						onClick={(e) => handleNumber(e, 3)}>
						<FaUser className='menu__icon' />
						<span className='menu__text'>플래너</span>
					</a>
					<a
						className={`menu__item ${menuNumber === 4 ? 'menu__item--active' : ''}`}
						onClick={(e) => handleNumber(e, 4)}>
						<FaRegCalendarAlt className='menu__icon' />
						<span className='menu__text'>캘린더</span>
					</a>
					<a
						className={`menu__item ${menuNumber === 5 ? 'menu__item--active' : ''}`}
						onClick={(e) => handleNumber(e, 5)}>
						<FaSearch className='menu__icon ' />
						<span className='menu__text'>검색</span>
					</a>
					{/* <a className='menu__item'>
						<i className='menu__icon fa fa-trophy'></i>
						<span className='menu__text'>성과</span>
					</a>
					<a className='menu__item'>
						<i className='menu__icon fa fa-sliders'></i>
						<span className='menu__text'>통계</span>
					</a> */}
				</nav>
			</aside>
			<_RenderComponent id='_RenderComponent' fluid>
				{renderComponent()}
			</_RenderComponent>
		</>
	);
}

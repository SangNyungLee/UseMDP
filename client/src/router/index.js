import { createBrowserRouter } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import MyPage from '../pages/MyPage';
import PlannerPage from '../pages/PlannerPage';
import App from '../App';
import MyCalendar from '../component/MyCalendar';

const Router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <WelcomePage />,
			},
			{
				path: 'mypage',
				element: <MyPage />,
			},
		],
	},
	{
		path: '/planner',
		element: <PlannerPage />
	},
	{
		path: 'home',
		element: <HomePage />,
		children: [
			{
				index: true,
				element: <WelcomePage />,
			},
			{
				path: 'calender',
				element: <MyCalendar/>,
			},
		],
	},
]);

export default Router;

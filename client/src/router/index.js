import { createBrowserRouter } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import MyPage from '../pages/MyPage';
import PlannerPage from '../pages/PlannerPage';
import App from '../App';
import DefaultLoadMap from '../component/LoadMap/defaultLoadMap/DefaultLoadMap';
import Redirection from '../pages/Redirection';

const Router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <WelcomePage />,
			},
		],
	},
	{
		path: '/planner',
		element: <PlannerPage />,
	},
	{
		path: 'home',
		element: <HomePage />,
		children: [
			{
				index: true,
				element: <DefaultLoadMap />,
			},
		],
	},
	{
		path: '/google/callback',
		element: <Redirection provider='google' />,
	},
	{
		path: '/github/callback',
		element: <Redirection provider='github' />,
	},
]);

export default Router;

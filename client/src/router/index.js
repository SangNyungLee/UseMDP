import { createBrowserRouter } from 'react-router-dom';
import WelcomePage from '../views/WelcomePage';
import App from '../App';

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
]);

export default Router;

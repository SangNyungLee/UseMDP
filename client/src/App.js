
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './constant/css/index.css';
import RealHeader from './component/RealHeader';

function App() {
	return (
		<>
			<RealHeader />
			<Outlet />
		</>
	);
}

export default App;

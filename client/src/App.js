import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header';

function App() {
	return (
		<>
			<Header/>
			<Outlet/>
		</>
	);
}

export default App;

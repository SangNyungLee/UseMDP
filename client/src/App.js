import { Outlet } from 'react-router-dom';
import Header from './views/Header';

function App() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
}

export default App;

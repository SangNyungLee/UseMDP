import { Outlet } from 'react-router-dom';
import Header from './views/Header';
import MyDivBox from './post/RightClicker/MyDivBox';
import MyDayPicker from './post/RightClicker/MyDayPicker';
function App() {
    return (
        <>
            <Header />
            <MyDayPicker></MyDayPicker>
            <MyDayPicker></MyDayPicker>
            <MyDivBox></MyDivBox>
            <Outlet />
        </>
    );
}

export default App;

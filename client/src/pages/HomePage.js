import { Outlet } from 'react-router';
import HomeSideBar from '../component/HomeSideBar';

export default function HomePage() {
    return (
        <>
            <div>HomePage</div>
            <div style={{ display: 'flex' }}>
                <HomeSideBar />
                <Outlet />
            </div>
        </>
    );
}

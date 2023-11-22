import { Outlet } from 'react-router';
import HomeSideBar from '../component/home/HomeSideBar';

export default function HomePage() {
    return (
        <>
            <div>HomePage</div>
            <div style={{ display: 'flex' }}>
                <HomeSideBar />
                <div style={{ flexGrow: 1 }}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

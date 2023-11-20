// import DefaultLoadMap from '../component/home/DefaultLoadMap';
import { useState } from 'react';
import DefaultComponent from '../component/DefaultComponent';
import StarComponent from '../component/StarComponent';
export default function HomePage() {
    const [menuNumber, setMenuNumber] = useState();
    const renderComponent = () => {
        switch (menuNumber) {
            case 1:
                return <DefaultComponent />;
            case 2:
                return <StarComponent />;
            case 3:
                return <DefaultComponent />;
            case 4:
                return <DefaultComponent />;
            case 5:
                return <DefaultComponent />;
            default:
                return <DefaultComponent />;
        }
    };
    const handleNumber = (number) => {
        setMenuNumber(number);
    };

    return (
        <div>
            <div>
                <button className="default" onClick={() => handleNumber(1)}>
                    1
                </button>
                <button className="default" onClick={() => handleNumber(2)}>
                    2
                </button>
                <button className="default" onClick={() => handleNumber(3)}>
                    3
                </button>
                <button className="default" onClick={() => handleNumber(4)}>
                    4
                </button>
                <button className="default" onClick={() => handleNumber(5)}>
                    5
                </button>
            </div>
            {renderComponent()}
        </div>
    );
}

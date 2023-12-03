import { useEffect, useState } from 'react';
import DataDownload from '../../../utils/DataDownload';
import ThumbnailMaker from '../RightClicker/ThumbnailMaker';
import { useDispatch } from 'react-redux';
import { plannerListActions } from '../../../store/plannerList';
import NoEditMDPmodal from './NoEditMDPmodal';
import { useNavigate } from 'react-router-dom';
import { FaTrello, FaSearch, FaPlus, FaInfo, FaBell, FaStar, FaLock, FaLockOpen, FaEllipsisH, FaDownload, FaUser } from 'react-icons/fa';
import { patchPlanner } from '../../../utils/DataAxios';

export default function NoEditQuoteHeader(props) {
    const { selectedCard, thumnnailRef, visible, setVisible, plannerList, plannerInfo } = props;
    const [plannerId, setPlannerId] = useState();
    const [plannerTitle, setPlannerTitle] = useState();
    const [readData, setReadData] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleThumbnailDownload() {
        console.log('download', thumnnailRef.current);
        ThumbnailMaker(thumnnailRef);
    }
    const Addplanner = () => {};
    const handleDownLoad = () => {
        DataDownload(plannerTitle, plannerList);
    };

    const homeNavigate = () => {
        navigate('/');
    };
    return (
        <>
            <div className="nav-main">
                <div className="nav-bar">
                    <div className="left-bar">
                        <button onClick={homeNavigate} type="button" className="button-style">
                            <FaTrello style={{ fontSize: '16px', color: 'white', marginBottom: '6px' }} />
                            <span className="text-style">로고자리</span>
                        </button>

                        {/* <button type="button" className="button-style">
            <FaSearch className="search-icon " />
          </button> */}
                    </div>

                    <div className="right-bar">
                        <button onClick={Addplanner} type="button" className="button-style-right">
                            <FaPlus style={{ fontSize: '16px', color: 'white' }} />
                        </button>

                        <button onClick={handleDownLoad} type="button" className="button-style-right">
                            <FaDownload style={{ fontSize: '16px', color: 'white' }} />
                        </button>

                        <button type="button" className="button-style-right">
                            <FaUser style={{ fontSize: '16px', color: 'white' }} />
                        </button>
                    </div>
                </div>

                <div className="content-header">
                    <button type="button" className="button-style-header">
                        <span className="main-board" style={{ color: 'white' }}>
                            {plannerInfo.title}
                        </span>
                    </button>

                    <button type="button" className="button-style-header">
                        <FaStar style={{ fontSize: '12px', color: 'white' }} />
                    </button>

                    <button type="button" className="button-style-header">
                        <FaLock style={{ fontSize: '12px', color: 'white', marginRight: '5px' }} />
                        <span className="private-text">Private</span>
                    </button>

                    <button type="button" className="button-style-header">
                        <FaLockOpen style={{ fontSize: '12px', color: 'white', marginRight: '5px' }} />
                        <span className="private-text">Public</span>
                    </button>
                </div>

                <div className="content-header-right">
                    <button type="button" className="button-style-header-right">
                        <FaEllipsisH style={{ fontSize: '12px', color: 'white' }} />
                        <span className="menu-text">Switch</span>
                    </button>
                </div>
            </div>
            <NoEditMDPmodal selectedCard={selectedCard} modalStatus={visible} plannerId={plannerId} modalClose={() => setVisible(false)} />
        </>
    );
}

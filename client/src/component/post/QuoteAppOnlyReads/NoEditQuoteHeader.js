import DataDownload from '../../../utils/DataDownload';
import NoEditMDPmodal from './NoEditMDPmodal';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaStar, FaLock, FaLockOpen, FaEllipsisH, FaDownload, FaUser, FaArrowLeft } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

export default function NoEditQuoteHeader(props) {
    const isMobile = useMediaQuery({
        query: '(max-width: 1024px)',
    });
    const { selectedCard, visible, setVisible, plannerList, plannerInfo } = props;
    const { title } = plannerInfo

    const navigate = useNavigate();

    const handleDownLoad = () => {
        DataDownload(title, plannerList);
    };

    const homeNavigate = () => {
        navigate(-1);
    };
    return (
        <>
            <div className="nav-main">
                <div className="nav-bar">
                    <div className="left-bar">
                        <button onClick={homeNavigate} type="button" className="button-style-2">
                            <FaArrowLeft
                                style={{
                                    fontSize: '16px',
                                    color: 'white',
                                    marginBottom: '6px',
                                }}
                            />
                        </button>
                    </div>

                    <div className="right-bar">
                        <button type="button" className="button-style-right">
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

                    {plannerInfo.plannerAccess == 'PRIVATE' ? (
                        <button type="button" className="button-style-right">
                            <FaLock style={{ fontSize: '12px', color: 'white', marginRight: '5px' }} />
                            <span className="private-text">Private</span>
                        </button>
                    ) : (
                        <button type="button" className="button-style-header">
                            <FaLock style={{ fontSize: '12px', color: 'white', marginRight: '5px' }} />
                            <span className="private-text">Private</span>
                        </button>
                    )}

                    {plannerInfo.plannerAccess == 'PUBLIC' ? (
                        <button type="button" className="button-style-right">
                            <FaLockOpen style={{ fontSize: '12px', color: 'white', marginRight: '5px' }} />
                            <span className="private-text">Public</span>
                        </button>
                    ) : (
                        <button type="button" className="button-style-header">
                            <FaLockOpen style={{ fontSize: '12px', color: 'white', marginRight: '5px' }} />
                            <span className="private-text">Public</span>
                        </button>
                    )}
                </div>
                {isMobile && (
                    <div className="content-header-right">
                        <button
                            onClick={() => {
                                props.setSwitch((prev) => {
                                    return prev == 0 ? 1 : 0;
                                });
                            }}
                            type="button"
                            className="button-style-header-right"
                        >
                            <FaEllipsisH style={{ fontSize: '12px', color: 'white' }} />
                            <span className="menu-text">Switch</span>
                        </button>
                    </div>
                )}
            </div>
            <NoEditMDPmodal selectedCard={selectedCard} modalStatus={visible} modalClose={() => setVisible(false)} />
        </>
    );
}

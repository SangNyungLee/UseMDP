import React from 'react';
import { FaTrello, FaSearch, FaPlus, FaInfo, FaBell, FaStar, FaLock, FaLockOpen, FaEllipsisH, FaDownload, FaUser } from 'react-icons/fa';
import '../../constant/css/customHeader2.css';
function CustomHeader2(props) {
    // console.log(props.setSwitch);
    return (
        <div className="nav-main">
            <div className="nav-bar">
                <div className="left-bar">
                    <button type="button" className="button-style">
                        <FaTrello style={{ fontSize: '16px', color: 'white', marginBottom: '6px' }} />
                        <span className="text-style">로고자리</span>
                    </button>

                    {/* <button type="button" className="button-style">
            <FaSearch className="search-icon " />
          </button> */}
                </div>

                <div className="right-bar">
                    <button type="button" className="button-style-right">
                        <FaPlus style={{ fontSize: '16px', color: 'white' }} />
                    </button>

                    <button type="button" className="button-style-right">
                        <FaDownload style={{ fontSize: '16px', color: 'white' }} />
                    </button>

                    <button type="button" className="button-style-right">
                        <FaUser style={{ fontSize: '16px', color: 'white' }} />
                    </button>
                </div>
            </div>

            <div className="content-header">
                <button type="button" className="button-style-header">
                    <span className="main-board" style={{ color: 'white' }} contentEditable>
                        타이틀
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
                <button
                    type="button"
                    onClick={() => {
                        props.setSwitch((prev) => {
                            return prev == 0 ? 1 : 0;
                        });
                    }}
                    className="button-style-header-right"
                >
                    <FaEllipsisH style={{ fontSize: '12px', color: 'white' }} />
                    <span className="menu-text">Show menu</span>
                </button>
            </div>
        </div>
    );
}

export default CustomHeader2;

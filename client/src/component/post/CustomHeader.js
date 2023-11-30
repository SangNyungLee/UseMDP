import React from 'react';
import '../../constant/css/customHeader.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'typeface-courgette';

export default function CustomHeader() {
    return (
        <div>
            <header className="masthead">
                <div className="boards-menu">
                    <button className="boards-btn btn">썸네일</button>
                    <div className="board-search">
                        <input type="search" className="board-search-input" aria-label="Board Search" />
                        <i className="fas fa-search search-icon" aria-hidden="true"></i>
                    </div>
                </div>

                <div className="logo">
                    <span>useMDP</span>
                </div>

                <div className="user-settings">
                    <button className="user-settings-btn btn" aria-label="Create">
                        <i className="fas fa-plus" aria-hidden="true"></i>
                    </button>

                    <button className="user-settings-btn btn" aria-label="Information">
                        <i className="fas fa-info-circle" aria-hidden="true"></i>
                    </button>

                    <button className="user-settings-btn btn" aria-label="Notifications">
                        <i className="fas fa-bell" aria-hidden="true"></i>
                    </button>

                    <button className="user-settings-btn btn" aria-label="User Settings">
                        <i className="fas fa-user-circle" aria-hidden="true"></i>
                    </button>
                </div>
            </header>

            <section className="board-info-bar">
                <div className="board-controls">
                    <button className="board-title btn">
                        <h2>Web Development</h2>
                    </button>
                    <button className="star-btn btn" aria-label="Star Board">
                        <i className="far fa-star" aria-hidden="true"></i>
                    </button>
                    <button className="personal-btn btn">Personal</button>
                    <button className="private-btn btn">
                        <i className="fas fa-briefcase private-btn-icon" aria-hidden="true"></i>
                        Private
                    </button>
                </div>

                <button className="menu-btn btn">
                    <i className="fas fa-ellipsis-h menu-btn-icon" aria-hidden="true"></i>
                    메뉴
                </button>
            </section>
        </div>
    );
}

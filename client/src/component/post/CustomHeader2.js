import React, { useEffect, useRef, useState } from 'react';
import { FaTrello, FaPlus, FaStar, FaLock, FaLockOpen, FaEllipsisH, FaDownload, FaUser, FaArrowLeft } from 'react-icons/fa';
import '../../constant/css/customHeader2.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { plannerListActions } from '../../store/plannerList';
import { getPlannerBtoA, patchPlanner } from '../../utils/DataAxios';
import DataDownload from '../../utils/DataDownload';
import { requestFail } from '../etc/SweetModal';
import { readPlanner } from '../../utils/DataAxiosParsing';
import { validateUnspecifiedPlannerData } from '../../utils/DataValidate';
import FileImageInputComponent from '../FileImageInputComponent';

function CustomHeader2(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const plannerInfo = props.plannerInfo;
    console.log('프롭스', props.plannerInfo);

    const [readThumbnail, setReadThumbnail] = useState();

    const titleRef = useRef();

    useEffect(() => {
        if (plannerInfo) {
            const { title } = plannerInfo;
            titleRef.current.innerText = title;
        }
    }, [plannerInfo]);

    useEffect(() => {
        if (readThumbnail) {
            patchPlannerAndDispatch(readThumbnail);
            setReadThumbnail();
        }
    }, [readThumbnail]);

    const handleBlur = async (e) => {
        const data = {
            ...plannerInfo,
            title: e.target.innerText,
        };
        const res = await patchPlanner(data);
        if (res.status !== 200) {
            requestFail('플래너 제목 수정');
            return;
        }
        dispatch(
            plannerListActions.updatePlannerTitle({
                plannerId: plannerInfo.plannerId,
                title: e.target.innerText,
            })
        );
    };
    const handlePublic = async () => {
        const data = {
            ...plannerInfo,
            plannerAccess: 'PUBLIC',
        };
        console.log('handlepublic', data);
        const res = await patchPlanner(data);
        if (res.status !== 200) {
            requestFail('플래너 상태 저장');
            return;
        }
        dispatch(
            plannerListActions.updatePlannerAccess({
                plannerId: plannerInfo.plannerId,
                plannerAccess: 'PUBLIC',
            })
        );
    };

    const handlePrivate = async () => {
        const data = {
            ...plannerInfo,
            plannerAccess: 'PRIVATE',
        };
        console.log('handlepublic', data);
        const res = await patchPlanner(data);
        if (res.status !== 200) {
            requestFail('플래너 상태 저장');
            return;
        }
        dispatch(
            plannerListActions.updatePlannerAccess({
                plannerId: plannerInfo.plannerId,
                plannerAccess: 'PRIVATE',
            })
        );
    };

    const homeNavigate = () => {
        navigate(-1);
    };

    const handleDownLoad = async () => {
        const res = await getPlannerBtoA(btoa(plannerInfo.plannerId));
        if (res.status !== 200) {
            requestFail('다운로드 실패');
        }
        console.log('다운로드', plannerInfo.plannerId, res.data.data);
        DataDownload(plannerInfo.title, res.data.data);
    };

    const [readFile, setReadFile] = useState();
    const fileInputRef = useRef();
    //useRead를 참고

    const handleButtonClick = (e) => {
        e.stopPropagation();
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContents = e.target.result;
            setReadFile(fileContents);
        };
        reader.readAsText(event.target.files[0]);
        resetFileInput();
    };

    useEffect(() => {
        if (readFile) {
            const data = JSON.parse(readFile);
            console.log('data', data);
            if (validateUnspecifiedPlannerData(data)) {
                console.log('planner');
                readPlannerData(data, false);
            } else {
                requestFail('파일 읽기', '올바르지 않은 형식');
            }
        }
    }, [readFile]);

    const readPlannerData = async (data, specified) => {
        const result = await readPlanner(data, specified);
        console.log('read planner result', result);
        if (result) {
            dispatch(plannerListActions.addPlanner(result));
        } else {
            requestFail('데이터');
        }
    };

    const resetFileInput = () => {
        const currentFileInput = fileInputRef.current;

        const newFileInput = document.createElement('input');
        newFileInput.type = 'file';
        newFileInput.style.display = 'none';

        newFileInput.addEventListener('change', handleFileChange);

        if (currentFileInput.parentNode) {
            currentFileInput.parentNode.replaceChild(newFileInput, currentFileInput);
        }

        fileInputRef.current = newFileInput;
    };

    const patchPlannerAndDispatch = async (thumbnail) => {
        const data = { ...plannerInfo, thumbnail: thumbnail };
        console.log('patchPlannerAndDispatch', data);
        const res = await patchPlanner(data);
        if (res.status !== 200) {
            requestFail('플래너 상태 저장');
        }
        dispatch(
            plannerListActions.updatePlannerThumbnail({
                plannerId: plannerInfo.plannerId,
                thumbnail,
            })
        );
    };

    return (
        <div className="nav-main">
            <div className="nav-bar">
                <div className="left-bar">
                    <button onClick={homeNavigate} type="button" className="button-style">
                        <FaTrello style={{ fontSize: '16px', color: 'white', marginBottom: '6px' }} />
                        {/* <span className="text-style">로고자리</span> */}
                    </button>

                    {/* <button type="button" className="button-style">
            <FaSearch className="search-icon " />
          </button> */}
                </div>

                <div className="right-bar">
                    <button onClick={homeNavigate} type="button" className="button-style-2">
                        <FaArrowLeft style={{ fontSize: '16px', color: 'white', marginBottom: '6px' }} />
                    </button>
                    <button onClick={handleButtonClick} type="button" className="button-style-right">
                        <FaPlus style={{ fontSize: '16px', color: 'white' }} />
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
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
                    <span
                        className="main-board"
                        style={{ color: 'white' }}
                        contentEditable
                        onBlur={(e) => {
                            handleBlur(e);
                        }}
                        ref={titleRef}
                    />
                </button>

                <button type="button" className="button-style-header">
                    <FaStar style={{ fontSize: '12px', color: 'white' }} />
                </button>

                <button onClick={handlePrivate} type="button" className="button-style-header">
                    <FaLock style={{ fontSize: '12px', color: 'white', marginRight: '5px' }} />
                    <span className="private-text">Private</span>
                </button>

                <button onClick={handlePublic} type="button" className="button-style-header">
                    <FaLockOpen style={{ fontSize: '12px', color: 'white', marginRight: '5px' }} />
                    <span className="private-text">Public</span>
                </button>
                
                <FileImageInputComponent setState={setReadThumbnail}/>
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
                    <span className="menu-text">Switch</span>
                </button>
            </div>
        </div>
    );
}

export default CustomHeader2;

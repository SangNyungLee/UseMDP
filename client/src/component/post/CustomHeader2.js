import React, { useEffect, useRef, useState } from 'react';
import { FaTrello, FaPlus, FaStar, FaLock, FaLockOpen, FaEllipsisH, FaDownload, FaUser, FaArrowLeft, FaTags } from 'react-icons/fa';
import '../../constant/css/customHeader2.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { plannerListActions } from '../../store/plannerList';
import { getPlannerBtoA, patchPlanner } from '../../utils/DataAxios';
import DataDownload from '../../utils/DataDownload';
import { requestFail } from '../etc/SweetModal';
import { readPlanner } from '../../utils/DataAxiosParsing';
import { validateUnspecifiedPlannerData } from '../../utils/DataValidate';
import Swal from 'sweetalert2';
function CustomHeader2(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const plannerInfo = props.plannerInfo;
    const [tags2, setTags] = useState([]);
    const titleRef = useRef();

    useEffect(() => {
        if (plannerInfo) {
            const { title } = plannerInfo;
            titleRef.current.innerText = title;
        }
    }, [plannerInfo]);

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

    // useEffect(() => {
    //     async function getTag() {
    //         const result = await getTags();
    //         if (result.status === 200) {
    //             console.log('태그 데이터 받아온 결과 : ', result.data);
    //             setTags(result.data.data);
    //         } else {
    //             requestFail('태그 불러오기');
    //         }
    //     }
    // }, []);
    // const readPlannerData = async (data, specified) => {
    //     const result = await readPlanner(data, specified);
    //     console.log('read planner result', result);
    //     if (result) {
    //         dispatch(plannerListActions.addPlanner(result));
    //     } else {
    //         requestFail('데이터');
    //     }
    // };

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

    const setTagSelector = async (e) => {
        // SweetAlert을 이용하여 입력 폼을 보여줌
        e.stopPropagation();
        const result = await Swal.fire({
            title: '플래너 생성',
            html: '<input id="swal-input1" class="swal2-input" placeholder="제목">' + '<input id="swal-input2" class="swal2-input" placeholder="작성자">',
            input: 'radio',
            inputOptions: {
                PUBLIC: 'Public',
                PRIVATE: 'Private',
            },
            inputValidator: (value) => {
                if (!value) {
                    return '공개범위를 선택하세요.';
                }
            },
            confirmButtonText: '확인',
            showCancelButton: true,
        });

        if (result.isConfirmed) {
            // 입력값을 가져와서 상태 업데이트
            const titleInput = Swal.getPopup().querySelector('#swal-input1').value;
            const creatorInput = Swal.getPopup().querySelector('#swal-input2').value;
            const plannerAccessInput = result.value;
            console.log('title', titleInput, creatorInput, plannerAccessInput);
            setEditedTitle(titleInput);
            setEditedCreator(creatorInput);
            setEditedPlannerAccess(plannerAccessInput);

            // 확인 버튼 클릭 시 플래너 생성 함수 호출
            handleSaveChanges(titleInput, creatorInput, plannerAccessInput);
        }
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
                    <button onClick={homeNavigate} type="button" className="button-style-right">
                        <FaArrowLeft style={{ fontSize: '16px', color: 'white' }} />
                    </button>

                    <button onClick={showTagSelector} type="button" className="button-style-right">
                        <FaTags style={{ fontSize: '16px', color: 'white' }} />
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

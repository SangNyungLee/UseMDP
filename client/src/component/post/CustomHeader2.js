import React, { useEffect, useRef, useState } from 'react';
import { FaTrello, FaPlus, FaStar, FaLock, FaLockOpen, FaEllipsisH, FaDownload, FaUser, FaArrowLeft, FaTags } from 'react-icons/fa';
import '../../constant/css/customHeader2.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { plannerListActions } from '../../store/plannerList';
import { getPlannerBtoA, getTags, patchPlanner, postPlanner } from '../../utils/DataAxios';
import DataDownload from '../../utils/DataDownload';
import { requestFail } from '../etc/SweetModal';
import { readPlanner } from '../../utils/DataAxiosParsing';
import { validateUnspecifiedPlannerData } from '../../utils/DataValidate';
import Select from 'react-select'; //라이브러리 import
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
function CustomHeader2(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const plannerInfo = props.plannerInfo;
    const [tags2, setTags] = useState([]);
    const [selectTag, setSelectTag] = useState([{ value: 'HTML', label: 'HTML', image: '/svg/HTML.svg' }]);
    const titleRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const selectInputRef = useRef();

    useEffect(() => {
        async function getTag() {
            const result = await getTags();
            if (result.status === 200) {
                console.log('태그 데이터 받아온 결과 : ', result.data);
                setTags(result.data.data);
            } else {
                requestFail('태그 불러오기');
            }
        }
        getTag();
    }, []);
    useEffect(() => {
        if (plannerInfo) {
            const { title, taglist } = plannerInfo;
            titleRef.current.innerText = title;

            const initialTags = taglist.map((tagValue) => {
                // tags 배열에서 해당하는 태그 정보 찾기
                const foundTag = tags2.find((tag) => tag.value === tagValue);

                // 찾은 태그 정보가 있으면 이미지를 포함하여 반환
                if (foundTag) {
                    return {
                        value: foundTag.value,
                        label: foundTag.label,
                        image: foundTag.image,
                    };
                }

                // 찾은 태그 정보가 없으면 tagValue를 그대로 반환
                return tagValue;
            });
            setSelectTag(initialTags);
        }
    }, [plannerInfo, tags2]);

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
    const handleTagModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = async () => {
        if (selectTag.length > 0) {
            const data = {
                ...plannerInfo,
                taglist: selectTag.map((item) => item.value),
            };
            console.log('selected Tag', data);
            const result = await patchPlanner(data);
            console.log(result);
            setShowModal(false);
            dispatch(
                plannerListActions.updateTags({
                    plannerId: plannerInfo.plannerId,
                    taglist: selectTag,
                })
            );
        } else {
            console.log('정보 없음');
            setShowModal(false);
        }
    };
    const handleCloseModalWithoutSave = () => {
        setShowModal(false);
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
    console.log('plINof', plannerInfo);
    return (
        <div className="nav-main">
            <div className="nav-bar">
                <div className="left-bar">
                    <button onClick={homeNavigate} type="button" className="button-style">
                        <FaTrello style={{ fontSize: '16px', color: 'white', marginBottom: '6px' }} />
                    </button>
                </div>

                <div className="right-bar">
                    <button onClick={homeNavigate} type="button" className="button-style-right">
                        <FaArrowLeft style={{ fontSize: '16px', color: 'white' }} />
                    </button>

                    <button onClick={handleTagModal} type="button" className="button-style-right">
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

            <Modal size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                        <Select
                            ref={selectInputRef}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    width: '35vw',
                                }),
                                multiValue: (baseStyles) => ({
                                    ...baseStyles,
                                    // backgroundColor: "lightblue", // 선택된 항목의 배경색
                                }),
                            }}
                            options={tags2} //위에서 만든 배열을 select로 넣기
                            //label custom 해주는거임
                            formatOptionLabel={(tag) => (
                                <div className="tag-option">
                                    <img src={tag.image} alt={tag.label} />
                                </div>
                            )}
                            value={selectTag}
                            onChange={setSelectTag} //값이 바뀌면 setState되게
                            isMulti
                        />
                    </div>
                    <div style={{ marginTop: '10px' }}> {selectTag.length > 0 ? selectTag.map((tag) => <img style={{ margin: '3px' }} src={tag.image} alt={tag.label}></img>) : null}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalWithoutSave}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CustomHeader2;

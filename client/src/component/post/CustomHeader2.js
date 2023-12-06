import React, { useEffect, useRef, useState } from 'react';
import { FaTrello, FaPlus, FaStar, FaLock, FaLockOpen, FaEllipsisH, FaDownload, FaUser, FaArrowLeft, FaTags } from 'react-icons/fa';

import '../../constant/css/customHeader2.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { plannerListActions } from '../../store/plannerList';
import { getPlannerBtoA, getTags, patchPlanner, postPlanner } from '../../utils/DataAxios';
import DataDownload from '../../utils/DataDownload';
import { requestFail } from '../etc/SweetModal';
import FileImageInputComponent from '../FileImageInputComponent';
import Select from 'react-select';
import { Modal, Button } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import FileInputComponent from '../FileInputComponent';

function CustomHeader2(props) {
    const isMobile = useMediaQuery({
        query: '(max-width: 1024px)',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const plannerInfo = props.plannerInfo;

    const [readThumbnail, setReadThumbnail] = useState();

    const [tags2, setTags] = useState([]);
    const [selectTag, setSelectTag] = useState([{ value: 'HTML', label: 'HTML', image: '/svg/HTML.svg' }]);

    const titleRef = useRef();

    const [showModal, setShowModal] = useState(false);
    const selectInputRef = useRef();

    useEffect(() => {
        async function getTag() {
            const result = await getTags();
            if (result.status === 200) {
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
            console.log(taglist);

            const tmp = taglist.filter((i) => i != null).map((item) => item.value);
            const initialTags = tags2.filter((tagValue) => {
                return tmp.includes(tagValue.value);
            });
            setSelectTag(initialTags);
        }
    }, [plannerInfo, tags2]);

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
    const handleToPrivate = async () => {
        const data = {
            ...plannerInfo,
            plannerAccess: 'PRIVATE',
        };
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

    const handleToPublic = async () => {
        const data = {
            ...plannerInfo,
            plannerAccess: 'PUBLIC',
        };
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
            const result = await patchPlanner(data);
            setShowModal(false);
            dispatch(
                plannerListActions.updateTags({
                    plannerId: plannerInfo.plannerId,
                    taglist: selectTag,
                })
            );
        } else {
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
        DataDownload(plannerInfo.title, res.data.data);
    };

    const patchPlannerAndDispatch = async (thumbnail) => {
        const data = { ...plannerInfo, thumbnail: thumbnail };
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
                    <button onClick={homeNavigate} type="button" className="button-style-right">
                        <FaArrowLeft style={{ fontSize: '16px', color: 'white' }} />
                    </button>
                </div>

                <div className="right-bar">
                    <button onClick={handleTagModal} type="button" className="button-style-right">
                        <FaTags style={{ fontSize: '16px', color: 'white' }} />
                    </button>

                    <FileInputComponent>
                        <button type="button" className="button-style-right">
                            <FaPlus style={{ fontSize: '16px', color: 'white' }} />
                        </button>
                    </FileInputComponent>

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

                {plannerInfo.plannerAccess == 'PRIVATE' ? (
                    <button type="button" className="button-style-right">
                        <FaLock style={{ fontSize: '12px', color: 'white', marginRight: '5px' }} />
                        <span className="private-text">Private</span>
                    </button>
                ) : (
                    <button onClick={handleToPrivate} type="button" className="button-style-header">
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
                    <button onClick={handleToPublic} type="button" className="button-style-header">
                        <FaLockOpen style={{ fontSize: '12px', color: 'white', marginRight: '5px' }} />
                        <span className="private-text">Public</span>
                    </button>
                )}

                <FileImageInputComponent setState={setReadThumbnail} />
            </div>
            {isMobile ? (
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
            ) : null}

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
                                valueContainer: (base) => ({
                                    ...base,
                                    height: '37px',
                                    overflowX: 'hidden',
                                }),
                                multiValue: (baseStyles) => ({
                                    ...baseStyles,
                                    display: 'none',
                                }),
                            }}
                            options={tags2}
                            formatOptionLabel={(tag) => (
                                <div className="tag-option">
                                    <img src={tag.image} alt={tag.label} />
                                </div>
                            )}
                            value={selectTag}
                            onChange={setSelectTag}
                            isMulti
                        />
                    </div>
                    <div style={{ marginTop: '10px' }}> {selectTag.length > 0 ? selectTag.map((tag, id) => <img key={id} style={{ margin: '3px' }} src={tag.image} alt={tag.label}></img>) : null}</div>
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

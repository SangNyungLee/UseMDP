import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CardEditor from '../post/Editor/CardEditor';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useDispatch } from 'react-redux';
import MyDayPicker from '../post/RightClicker/MyDayPicker';
import copy from 'fast-copy';
import { siteActions } from '../../store/site';
import { HexColorPicker } from 'react-colorful';
import { darken } from 'polished';
import axios from 'axios';
import { patchCard } from '../../utils/DataAxios';

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const _TitleInput = styled.input`
    border: none;
    outline: none;
    padding: none;
    background-color: ${(props) => props.color};

    &:focus {
        background-color: ${(props) => darken(0.1, props.color)};
    }
`;

const _TodoAddButton = styled.button`
    background-color: white;
    border: none;
    font-family: 'SUITE-Regular';
    margin-top: 10px;
    color: #545454;
    padding: 0px;
    border-radius: 3px;

    &:active {
        background-color: #ccc;
    }
`;

const _ColorPickerModal = styled.div`
    position: fixed;
    z-index: 1;
`;

const _ChecklistContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 25px;
    margin-bottom: 15px;
    justify-content: space-between;
`;

const _Title = styled.div`
    margin-top: 50px;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bolder;
    font-family: 'SUITE-Regular';
    letter-spacing: 1px;
`;

const _Span = styled.span`
    font-size: 19px;
    font-weight: bolder;
`;

const _CheckBox = styled.input`
    width: 15px;
`;

const _TextInput = styled.input`
    width: 87%;
    border: none;
    border-bottom: 1px solid #ccc;
`;

const _DeleteButton = styled.button`
    border: none;
    background: none;
    display: flex;
`;

export default function MDPModal({ selectedCard, modalStatus, modalClose, plannerId }) {
    //구조 분해할당
    const [show, setShow] = useState(false);

    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');
    const [checklists, setChecklists] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [coverColor, setCoverColor] = useState('');
    const [cardStatus, setCardStatus] = useState('');

    const Edits = [post, setPost];

    const dispatch = useDispatch();

    const handleCloseWithoutSave = () => {
        modalClose();
        setShow(false);
    };

    const handleClose = async () => {
        const newChecklist = checklists.map((item) => {
            return item.isNew == 1 ? { title: item.title, checked: item.checked } : item;
        });
        const newCardItem = {
            ...selectedCard,
            title,
            post,
            checklists: newChecklist,
            plannerId,
            post,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            coverColor,
        };
        console.log('MODAL에서 보내는 item', newCardItem);
        try {
            const result = await patchCard(newCardItem);
            dispatch(siteActions.setIsData(false));
            modalClose();
            setShow(false);
        } catch (err) {
            console.log(err);
        }
    };

    //체크박스 온체인지
    const handleCheckboxChange = (index, value) => {
        const changeValue = value ? 1 : 0;
        setChecklists((prevCheckLists) => {
            const updatedCheckLists = copy(prevCheckLists);
            updatedCheckLists[index]['checked'] = changeValue;
            return updatedCheckLists;
        });
    };

    const handleProgessBar = () => {
        if (checklists) {
            const done = checklists.filter((item) => item.checked === 1).length;
            const total = checklists.length;
            const progress = (done / total) * 100;
            return progress;
        } else {
            return 0;
        }
    };

    useEffect(() => {
        const { title, post, startDate, endDate, coverColor, checklists, cardStatus } = selectedCard;
        setTitle(title);
        setPost(post);
        setStartDate(new Date(startDate));
        setEndDate(new Date(endDate));
        setCoverColor(coverColor);
        setCardStatus(cardStatus);
        setChecklists(checklists);
        setShow(modalStatus);
        setModalOpen(false);
        // const checklist = getCheckListAxios();
    }, [modalStatus]);

    // useEffect(() => {
    //     if (checklists) {
    //         setChecklists(checklists);
    //     }
    // }, [checklists]);

    const addTodo = () => {
        const currentTime = new Date();
        setChecklists((prev) => [
            ...prev,
            {
                checklistId: prev.checklistId + 1,
                checked: 0,
                title: 'default',
                createdAt: currentTime.toISOString(),
                updatedAt: currentTime.toISOString(),
                isNew: 1,
            },
        ]);
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 });

    const handleHeaderClick = (e) => {
        setModalOpen((prev) => !prev);
        setModalPosition({
            left: e.clientX,
            top: e.clientY,
        });
    };

    const checkTitleEdit = (index, value) => {
        const newChecklist = [...checklists];
        newChecklist[index] = { ...newChecklist[index], title: value };
        setChecklists(newChecklist);
    };

    const deleteCheck = (index) => {
        setChecklists((prev) => prev.filter((_, id) => id !== index));
    };
    // console.log(checklists);
    return (
        <>
            <Modal show={show} onHide={handleCloseWithoutSave}>
                <Modal.Header style={{ backgroundColor: coverColor }} onClick={handleHeaderClick} closeButton>
                    {isModalOpen && (
                        <_ColorPickerModal style={modalPosition}>
                            <HexColorPicker color={coverColor} onChange={setCoverColor} />
                        </_ColorPickerModal>
                    )}
                    <Modal.Title>
                        <_TitleInput value={title} color={coverColor} onChange={(e) => setTitle(e.target.value)} onClick={(e) => e.stopPropagation()} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProgressBar now={handleProgessBar()}></ProgressBar>
                    <CardEditor editpost={Edits} post={post}></CardEditor>
                    <_Title>Check List</_Title>
                    <FlexContainer>
                        <MyDayPicker date={startDate} setDate={setStartDate} />
                        <_Span>~</_Span>
                        <MyDayPicker date={endDate} setDate={setEndDate} />
                    </FlexContainer>
                    <div>
                        {checklists
                            ? checklists.map((item, index) => {
                                  return (
                                      <_ChecklistContainer key={index}>
                                          <_CheckBox type="checkbox" checked={item.checked == 1} onChange={(e) => handleCheckboxChange(index, e.target.checked)} />
                                          <_TextInput type="text" value={item.title} onChange={(e) => checkTitleEdit(index, e.target.value)} />
                                          <_DeleteButton type="button" onClick={() => deleteCheck(index)}>
                                              <i class="material-icons" style={{ fontSize: '20px', color: '#ccc' }}>
                                                  delete
                                              </i>
                                          </_DeleteButton>
                                      </_ChecklistContainer>
                                  );
                              })
                            : null}
                        <_TodoAddButton onClick={addTodo}>+ add item</_TodoAddButton>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleCloseWithoutSave}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
//

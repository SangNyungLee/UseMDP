import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import CardEditor from '../post/Editor/CardEditor';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useDispatch } from 'react-redux';
import MyDayPicker from '../post/RightClicker/MyDayPicker';
import copy from 'fast-copy';
import { siteActions } from '../../store/site';
import { HexColorPicker } from 'react-colorful';
import { darken } from 'polished';
import { deleteCheckList, patchCard } from '../../utils/DataAxios';
import description from '../../constant/img/description.svg';
import list2 from '../../constant/img/list2.svg';
import list1 from '../../constant/img/list.svg';
import calendarImg from '../../constant/img/calendar.svg';
import parse from 'html-react-parser';
import IsBackGroundDark from '../../utils/IsBackGroundDark';
import { requestFail } from '../etc/SweetModal';
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
    color: ${(props) => props.textcolor || "black"};
    &:focus {
        background-color: ${(props) => darken(0.1, props.color)};
    }
`;

const _TodoAddButton = styled.button`
    font-size: 12px;
    font-weight: bold;
    background-color: #091e420f;
    border: 3px #091e420f;
    border-radius: 3px;
    &:hover {
        background-color: #091e424f;
    }
    margin-bottom: 10px;
`;

const _ColorPickerModal = styled.div`
    position: fixed;
    z-index: 1;
`;

const _ChecklistContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: space-between;
`;

const _Span = styled.span`
    font-size: 19px;
    font-weight: bolder;
`;

const _CheckBox = styled.input`
    margin-left: 35px;
    width: 15px;
`;

const _TextInput = styled.input`
    height: 35px;
    width: 87%;
    margin-left: 5px;
    border: 1px solid #091e420f;
    border-radius: 3px;
    outline: none;
    /* border-bottom: 1px solid #ccc; */
    &:focus {
        border: 2px solid #007bff;
    }
`;

const _DeleteButton = styled.button`
    border: none;
    background: none;
    display: flex;
`;

const TitleEdit = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    letter-spacing: 1px;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bolder;
`;

const IconImg = styled.img`
    margin: 0 10px 10px 10px;
`;
const ParseContainer = styled.div`
    margin-left: 35px;
`;

const DefaultBtn = styled.button`
    width: 50px;
    font-size: 12px;
    font-weight: bold;
    background-color: #091e420f;
    border: 3px #091e420f;
    border-radius: 3px;
    &:hover {
        background-color: #091e424f;
    }
`;

const AcceptButton = styled.button`
    background-color: #007bff !important;
    color: white;
    width: 50px;
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px;
    border: 3px #091e420f;
    border-radius: 3px;
    height: 35px;
    margin-right: 5px;
`;

const CancelButton = styled.button`
    width: 50px;
    font-size: 12px;
    font-weight: bold;
    height: 35px;
    background-color: #091e420f;
    border: 3px #091e420f;
    border-radius: 3px;
    background-color: '#091E420F';
    &:hover {
        background: #ccc;
    }
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
    const [editorHide, setEditorHide] = useState(false);
    //내부에서 쓰는 로직 밖으로 내보내지 않음.
    const Edits = [post, setPost];
    const [editingIndex, setEditingIndex] = useState(null);
    const [progress, setProgress] = useState(0);
    const [tmpEdit, setTmpEdit] = useState('');
    const [deletedCheckList, setDeletedCheckList] = useState([]);
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
        try {
            const result = await patchCard(newCardItem);
            if(result.status !== 200) {
                requestFail("카드 데이터 저장")
            }
            for (let id of deletedCheckList) {
                if (!isNaN(id)) {
                    const res = await deleteCheckList(id);
                    if(res.status !== 200){
                        requestFail("체크리스트 삭제")
                        continue;
                    }
                }
            }
            dispatch(siteActions.setIsData(false));
            setDeletedCheckList([]);
            modalClose();
            setShow(false);
        } catch (err) {
            console.log(err);
        }
    };

    //체크박스 온체인지
    const handleCheckboxChange = (index, value) => {
        const changeValue = value ? 1 : 0;
        handleProgessBar();
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
        setEditorHide(post == '' ? false : true);
        if (checklists) {
            const done = checklists.filter((item) => item.checked === 1).length;
            const total = checklists.length;
            const progress = (done / total) * 100;
            setProgress(progress);
        } else {
            setProgress(0);
        }
        // const checklist = getCheckListAxios();
    }, [modalStatus]);

    useEffect(() => {
        if (checklists) {
            const done = checklists.filter((item) => item.checked === 1).length;
            const total = checklists.length;
            const progress = (done / total) * 100;
            setProgress(progress);
        } else {
            setProgress(0);
        }
    }, [checklists]);

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

    const checkTitleEdit = (index) => {
        const newChecklist = [...checklists];
        newChecklist[index] = { ...newChecklist[index], title: tmpEdit };
        setChecklists(newChecklist);
        editClose();
    };
    const editClose = () => {
        setEditingIndex(null);
    };

    const deleteCheck = (index) => {
        setDeletedCheckList((prev) => [...prev, checklists[index].checklistId]);
        setChecklists((prev) => prev.filter((_, id) => id !== index));
    };

    return (
        <>
            <Modal show={show} onHide={handleCloseWithoutSave} size="lg">
                <Modal.Header style={{ backgroundColor: coverColor }} onClick={handleHeaderClick} closeButton>
                    {isModalOpen && (
                        <_ColorPickerModal style={modalPosition}>
                            <HexColorPicker color={coverColor} onChange={setCoverColor} />
                        </_ColorPickerModal>
                    )}
                    <Modal.Title>
                        <_TitleInput value={title} color={coverColor} textcolor={IsBackGroundDark(coverColor) ? 'white' : 'black'} onChange={(e) => setTitle(e.target.value)} onClick={(e) => e.stopPropagation()} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#091E420F' }}>
                    {/*여기에 overDue되면   */}
                    {startDate.getTime() < new Date().getTime() && endDate.getTime() < new Date().getTime() ? <DefaultBtn style={{ width: 'auto', height: '40px' }}>기간이 지났습니다.</DefaultBtn> : null}
                    <TitleEdit>
                        <div>
                            <IconImg src={description}></IconImg>Content
                        </div>
                        <DefaultBtn
                            onClick={() => {
                                setEditorHide((prev) => !prev);
                            }}
                        >
                            Edit
                        </DefaultBtn>
                    </TitleEdit>
                    {editorHide ? (
                        <ParseContainer
                            onClick={() => {
                                setEditorHide((prev) => !prev);
                            }}
                        >
                            {parse(post)}
                        </ParseContainer>
                    ) : (
                        <CardEditor editpost={Edits} post={post} setHide={setEditorHide}></CardEditor>
                    )}
                    <TitleEdit>
                        <div>
                            <IconImg src={list1}></IconImg>Progress
                        </div>
                    </TitleEdit>
                    <ProgressBar now={progress}></ProgressBar>

                    <TitleEdit>
                        <div>
                            <IconImg src={list2}></IconImg>Check List
                        </div>
                    </TitleEdit>
                    {/* <_Title>Check List</_Title> */}
                    <div>
                        {checklists
                            ? checklists.map((item, index) => {
                                  return (
                                      <_ChecklistContainer key={index}>
                                          <_CheckBox type="checkbox" checked={item.checked == 1} onChange={(e) => handleCheckboxChange(index, e.target.checked)} />

                                          {editingIndex === index ? (
                                              <>
                                                  <_TextInput type="text" value={item.title} onChange={(e) => setTmpEdit(e.target.value)} />
                                                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                      <AcceptButton onClick={(e) => checkTitleEdit(index)}>저장</AcceptButton>
                                                      <CancelButton onClick={editClose}>취소</CancelButton>
                                                  </div>
                                              </>
                                          ) : (
                                              <div style={{ marginLeft: '5px', width: '87%' }} onClick={() => setEditingIndex(index)}>
                                                  {item.checked == 1 ? <strike>{item.title}</strike> : item.title}
                                              </div>
                                          )}

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

                    <TitleEdit>
                        <div>
                            <IconImg src={calendarImg}></IconImg>Planning period
                        </div>
                    </TitleEdit>

                    <FlexContainer>
                        <div>
                            <IconImg src={calendarImg}></IconImg>
                            <_Span>Start Date</_Span>
                            <MyDayPicker date={startDate} setDate={setStartDate} />
                        </div>
                        {/* <_Span>~</_Span> */}
                        <div>
                            <IconImg src={calendarImg}></IconImg> <_Span>End Date</_Span>
                            <MyDayPicker date={endDate} setDate={setEndDate} />
                        </div>
                    </FlexContainer>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#091E420F' }}>
                    <CancelButton onClick={handleCloseWithoutSave}>Close</CancelButton>
                    <AcceptButton onClick={handleClose}>저장</AcceptButton>
                </Modal.Footer>
            </Modal>
        </>
    );
}
//
const ChildrenComponent = () => {
    return <></>;
};

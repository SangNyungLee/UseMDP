import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DatePicker from 'react-datepicker';
import { darken } from 'polished';
import description from '../../../constant/img/description.svg';
import list2 from '../../../constant/img/list2.svg';
import list1 from '../../../constant/img/list.svg';
import calendarImg from '../../../constant/img/calendar.svg';
import parse from 'html-react-parser';
import IsBackGroundDark from '../../../utils/IsBackGroundDark';

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
    color: ${(props) => props.textcolor || 'black'};
    &:focus {
        background-color: ${(props) => darken(0.1, props.color)};
    }
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

export default function NoEditMDPmodal({ selectedCard, modalStatus, modalClose }) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');
    const [checklists, setChecklists] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [coverColor, setCoverColor] = useState('');

    const handleCloseWithoutSave = () => {
        modalClose();
        setShow(false);
    };

    const handleProgessBar = () => {
        const done = checklists.filter((item) => item.checked === 1).length;
        const total = checklists.length;
        const progress = (done / total) * 100;
        return progress;
    };

    useEffect(() => {
        const { title, post, startDate, endDate, coverColor, checklists } = selectedCard;
        setTitle(title);
        setPost(post);
        setStartDate(new Date(startDate));
        setEndDate(new Date(endDate));
        setCoverColor(coverColor);
        setChecklists(checklists);
        setShow(modalStatus);
    }, [modalStatus]);

    let progress = checklists ? handleProgessBar() : 0;
    
    if (Object.keys(selectedCard).includes('status')) {
        return <></>;
    } else {
        return (
            <>
                <Modal show={show} onHide={handleCloseWithoutSave} size="lg">
                    <Modal.Header style={{ backgroundColor: coverColor }} closeButton>
                        <Modal.Title>
                            <_TitleInput value={title} color={coverColor} textColor={IsBackGroundDark(coverColor) ? 'white' : 'black'} readonly />
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#091E420F' }}>
                        <TitleEdit>
                            <div>
                                <IconImg src={description}></IconImg>Content
                            </div>
                        </TitleEdit>
                        {post ? <ParseContainer>{parse(post)}</ParseContainer> : null}

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
                        <div>
                            {checklists
                                ? checklists.map((item, index) => {
                                      return (
                                          <_ChecklistContainer key={index}>
                                              <_CheckBox type="checkbox" checked={item.checked == 1} readOnly />

                                              <div style={{ marginLeft: '5px', width: '87%' }}>{item.checked == 1 ? <strike>{item.title}</strike> : item.title}</div>
                                          </_ChecklistContainer>
                                      );
                                  })
                                : null}
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
                                <div>
                                    <DatePicker selected={startDate} dateFormat="yyyy-MM-dd" />
                                </div>
                            </div>
                            <div>
                                <IconImg src={calendarImg}></IconImg> <_Span>End Date</_Span>
                                <div>
                                    <DatePicker selected={endDate} dateFormat="yyyy-MM-dd" />
                                </div>
                            </div>
                        </FlexContainer>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: '#091E420F' }}>
                        <AcceptButton onClick={handleCloseWithoutSave}>종료</AcceptButton>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

import styled from 'styled-components';
// import star from '../../constant/img/star.png';
// import yellowStar from '../../constant/img/yellowStar.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DataDownload from '../../utils/DataDownload';
import { calendarActions } from '../../store/calendar';
import { plannerListActions } from '../../store/plannerList';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from 'use-local-storage';
const _Container = styled.div`
    margin-bottom: 20px;
    width: fit-content;
`;

const _ImageStyle = styled.img`
    width: 230px;
    height: 150px;
    border-radius: 5px;
`;

const _TitleStyle = styled.div`
    font-size: 23px;
    margin-left: 2px;
`;

const _DescriptionStyle = styled.span`
    font-size: 17px;
    color: #8f8f8f;
    margin-left: 2px;
`;

const _Felx = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
`;

const _Share = styled.div`
    width: 20px;
    height: 20px;
    margin-right: 2px;
    color: #515151;
`;

const _isOpen = styled.div`
    color: #198754;
    font-weight: bolder;
    margin-left: 2px;
`;

const _Button = styled.button`
    border: none;
    background-color: #198754;
    color: white;
    width: 60px;
    height: 30px;
    border-radius: 2px;
    font-size: 14px;
    margin-right: 2px;
`;

const StyledShareIcon = styled.i`
    &.material-icons {
        cursor: pointer;
    }

    &:hover {
        color: #007bff; /* Change the color on hover as an example */
    }
`;

export default function MyLoadMap(props) {
    const dispatch = useDispatch();

    const state = useSelector((state) => state.plannerList);
    const [data, setData] = useLocalStorage('List', '');
    const { plannerId, title, creator, likePlanner, thumbnail, createdAt, updatedAt, plannerAccess, isDefault } = props.datas;
    // console.log(props);
    const navigate = useNavigate();
    const handleClick = async () => {
        //모달이 꺼져있으면
        if (!showModal) {
            const btoaId = btoa(plannerId);
            const result = await axios(`http://localhost:8080/api/getPlanner/${btoaId}`);
            const cardList = result.data.cards;
            const cards = [[], [], []];
            for (let i = 0; i < cardList.length; i++) {
                if (cardList[i].cardStatus === 'TODO') {
                    cards[0].push(cardList[i]);
                } else if (cardList[i].cardStatus === 'DOING') {
                    cards[1].push(cardList[i]);
                } else if (cardList[i].cardStatus === 'DONE') {
                    cards[2].push(cardList[i]);
                }
            }
            dispatch(calendarActions.setQuote([0]));
            dispatch(plannerListActions.replaceCards({ id: plannerId, cards: cards }));

            navigate(`/planner?id=${btoaId}`);
        }
    };
    const [starClick, setStarClick] = useState(false);

    // 모달 보여주기
    const [showModal, setShowModal] = useState(false);

    // 모달폼
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedPlannerAccess, setEditedPlannerAccess] = useState(plannerAccess);

    const handleShareIcon = (e) => {
        e.stopPropagation();
        //RightClicker 보내주자.
        DataDownload(editedTitle, {
            plannerId,
            creator,
            title: editedTitle,
            likePlanner,
            thumbnail,
            isDefault,
            createdAt,
            updatedAt,
            plannerAccess: editedPlannerAccess,
        });
    };

    const changeDataByButton = (e) => {
        e.stopPropagation();
        setShowModal(true);
    };
    //모달끄기
    const handleCloseModal = (e) => {
        e.stopPropagation();
        setShowModal(false);
        setEditedTitle(title);
        setEditedPlannerAccess(plannerAccess);
    };

    //저장
    const handleSaveChanges = async (e) => {
        e.stopPropagation();

        //업데이트하고, axios보내줘야한다.

        const result = await axios.patch('http://localhost:8080/api/patchPlanner', {
            plannerId,
            creator,
            title: editedTitle,
            likePlanner,
            thumbnail,
            isDefault,
            plannerAccess: editedPlannerAccess,
        });
        setShowModal(false);
    };

    return (
        <_Container onClick={handleClick}>
            <_ImageStyle src={thumbnail}></_ImageStyle>
            <div>
                <_Felx>
                    <_TitleStyle>{editedTitle}</_TitleStyle>
                    <_Share
                        onClick={(e) => {
                            handleShareIcon(e);
                        }}
                    >
                        <StyledShareIcon className="material-icons">share</StyledShareIcon>
                    </_Share>
                </_Felx>
                <_Felx>
                    <_isOpen>{editedPlannerAccess}</_isOpen>
                    <_Button
                        onClick={(e) => {
                            changeDataByButton(e);
                        }}
                    >
                        수정
                    </_Button>
                </_Felx>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Edit Planner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Title:</label>
                    <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                    <br></br>
                    <label>Planner Access:</label>

                    <input type="text" value={editedPlannerAccess} onChange={(e) => setEditedPlannerAccess(e.target.value)} />
                    {/* <label>Description:</label>
                    <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)}></textarea> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            handleCloseModal(e);
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(e) => {
                            handleSaveChanges(e);
                        }}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </_Container>
    );
}

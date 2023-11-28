import styled from 'styled-components';
import plus from '../../constant/img/plus_icon.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import base64Str from '../../constant/ImageBase64';
const PlusDiv = styled.div`
    width: 200px;
    height: 200px;
`;
const PlusImg = styled.img`
    width: 150px;
    height: 150px;
`;

export default function PlusMap(props) {
    const [showModal, setShowModal] = useState(false);

    // 모달폼
    const [editedCreator, setEditedCreator] = useState('');
    const [editedTitle, setEditedTitle] = useState('');
    const [editedPlannerAccess, setEditedPlannerAccess] = useState('');

    const handleCloseModal = (e) => {
        e.stopPropagation();
        setShowModal(false);
    };

    //저장
    const handleSaveChanges = async (e) => {
        e.stopPropagation();
        console.log(editedCreator, editedTitle, editedPlannerAccess);
        //axios로 planner를 생성하자.
        const data = {
            creator: editedCreator,
            title: editedTitle,
            thumbnail: base64Str,
            plannerAccess: editedPlannerAccess,
        };
        const result = await axios.post('http://localhost:8080/api/postPlanner', data, { withCredentials: true });
        setShowModal(false);
    };

    const handleClick = () => {
        setShowModal(true);
    };
    return (
        <PlusDiv
            onClick={() => {
                handleClick();
            }}
        >
            <PlusImg src={plus}></PlusImg>

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
                    <br />
                    <label>Creator</label>
                    <input type="text" value={editedCreator} onChange={(e) => setEditedCreator(e.target.value)} />
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
        </PlusDiv>
    );
}

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CardEditor from '../post/Editor/CardEditor';
import MyDayPicker from '../post/RightClicker/MyDayPicker';
import { useSelector } from 'react-redux';
const FlexContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;
function Example(props) {
    const cardItem = useSelector((state) => state.card);
    const { id, content, title, cover_Color, start_date, end_date, todolist } = cardItem;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [list, setList] = useState(todolist ? todolist : []);

    const handleCheckboxChange = (index, key) => {
        setList((prevTodoList) => {
            const updatedTodoList = [...prevTodoList];
            updatedTodoList[index][key] = !updatedTodoList[index][key];
            return updatedTodoList;
        });
    };
    useSelector((state) => {
        console.log(state);
    });
    // console.log('list:', list);
    // console.log('modal:', props.modalStatus);

    useEffect(() => {
        setShow(props.modalStatus);
    }, [props.modalStatus]);

    useEffect(() => {
        if (todolist) {
            setList(todolist);
        }
    }, [todolist]);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ backgroundColor: cover_Color }} closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CardEditor></CardEditor>
                    <FlexContainer>
                        <MyDayPicker date={start_date} />
                        <span>~</span>
                        <MyDayPicker date={end_date} />
                    </FlexContainer>
                    <div>
                        {list.map((item, index) => (
                            <div key={index}>
                                {Object.keys(item).map((key) => (
                                    <label key={key}>
                                        <input type="checkbox" checked={item[key]} onChange={() => handleCheckboxChange(index, key)} />
                                        {key}
                                    </label>
                                ))}
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CardEditor from '../post/Editor/CardEditor';
import { useDispatch } from 'react-redux';
import { planActions } from '../../store/planner';
import MyDayPicker from '../post/RightClicker/MyDayPicker';
import { useSelector } from 'react-redux';
import copy from 'fast-copy';
const FlexContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

function parseISOString(s) {
    if (s.length > 10) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    } else {
        // 데이터가 혼용되는 경우(데이터를 임의로 넣어서 그렇다)
        // 날짜 문자열을 년, 월, 일로 분리
        const [year, month, day] = s.split('-');
        // JavaScript Date 객체 생성
        return new Date(year, month - 1, day);
    }
}

function Example(props) {
    //카드 아이템을 만든다.
    const cardItem = useSelector((state) => state.card);
    //구조 분해할당
    const { id, post, title, cover_Color, startDate, endDate, todolist, intOrder, separatorPlan } = cardItem;
    const [show, setShow] = useState(false);

    //redux가 안바뀌니까, 새로 상태로 생성해주고

    //checkList
    const [list, setList] = useState(todolist ? todolist : []);
    //에디터
    const Edits = useState(post ? post : '');

    //디스패치
    const dispatch = useDispatch();

    //모달끄기
    const handleClose = () => {
        const idx1 = separatorPlan === 'TODO' ? 0 : separatorPlan === 'DOING' ? 1 : 2;
        const idx2 = intOrder;

        const newCardItem = {
            ...cardItem,
            todolist: list,
            post: Edits[0],
        };
        // console.log(newCardItem);
        dispatch(planActions.patchCardsByIdx({ idx1, idx2, cardItem: newCardItem }));

        props.modalClose();
        setShow(false);
    };

    //체크박스 온체인지
    const handleCheckboxChange = (index, key) => {
        setList((prevTodoList) => {
            const updatedTodoList = copy(prevTodoList);
            updatedTodoList[index][key] = !updatedTodoList[index][key];
            return updatedTodoList;
        });
    };

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
                    <CardEditor editpost={Edits} post={post}></CardEditor>
                    <FlexContainer>
                        <MyDayPicker date={parseISOString(startDate)} />
                        <span>~</span>
                        <MyDayPicker date={parseISOString(endDate)} />
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

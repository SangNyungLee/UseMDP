import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, Modal, ProgressBar, Form } from 'react-bootstrap';
import CardEditor from '../post/Editor/CardEditor';

import { useDispatch, useSelector } from 'react-redux';
import { planActions } from '../../store/planner';

import MyDayPicker from '../post/RightClicker/MyDayPicker';
import copy from 'fast-copy';
import { cardActions } from '../../store/card';

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// import Form from 'react-bootstrap/Form';
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
    console.log('cardItem', cardItem);
    //구조 분해할당
    const { id, post, title, coverColor, todolist, intOrder, cardStatus } = cardItem;
    const [show, setShow] = useState(false);
    const [picker, setPicker] = useState(false);
    const handlePicker = () => {
        setPicker(!picker);
    };
    // console.log('plan', separatorPlan);

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    console.log('plan', cardStatus);

    //redux가 안바뀌니까, 새로 상태로 생성해주고

    //checkList
    const [list, setList] = useState(todolist ? todolist : []);
    //에디터
    const Edits = useState(post ? post : '');

    //디스패치
    const dispatch = useDispatch();

    //colorPicker

    //모달끄기
    const handleClose = () => {
        const idx1 = cardStatus === 'TODO' ? 0 : cardStatus === 'DOING' ? 1 : 2;
        const idx2 = intOrder;

        const newCardItem = {
            ...cardItem,
            todolist: list,
            post: Edits[0],
        };
        // console.log(newCardItem);
        console.log(idx1, idx2);
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
    const handleProgessBar = () => {
        const done = list.filter((item) => Object.values(item).every((value) => value)).length;
        const total = list.length;
        const progress = (done / total) * 100;
        return progress;
    };

    useEffect(() => {
        setStartDate(new Date(cardItem.startDate));
        setEndDate(new Date(cardItem.endDate));
        setShow(props.modalStatus);
    }, [props.modalStatus]);

    useEffect(() => {
        if (todolist) {
            setList(todolist);
        }
    }, [todolist]);

    //colorChange Logic

    const handleColorChange = (e) => {
        //커버 컬러 , 모달만 변경
        dispatch(cardActions.setCover(e.target.value));
        //어처피 전체적으로는  dispatch(planActions.patchCardsByIdx({ idx1, idx2, cardItem: newCardItem })); 이게 해줄것
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header onClick={handlePicker} style={{ backgroundColor: coverColor }} closeButton>
                    <Modal.Title>{title}</Modal.Title>
                    <Form.Control
                        type="color"
                        defaultValue={coverColor}
                        title="Choose your color"
                        onChange={(e) => {
                            handleColorChange(e);
                        }}
                    />
                </Modal.Header>
                <Modal.Body>
                    <ProgressBar now={handleProgessBar()} label={`${handleProgessBar()}%`}></ProgressBar>
                    <CardEditor editpost={Edits} post={post}></CardEditor>
                    <FlexContainer>
                        <MyDayPicker date={startDate} setDate={setStartDate} />
                        <span>~</span>
                        <MyDayPicker date={endDate} setDate={setEndDate} />
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

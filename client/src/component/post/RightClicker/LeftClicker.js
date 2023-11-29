import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//props로 position을 줄것. 그럼 list그룹의 위치를 조절할 수 있다.
const LeftClicker = (props) => {
    //실제 예제에서는 여러 방법으로 Ref를 가져와야함.
    //혹은 html을 줘야함.

    //일단 로컬에 저장.
    const saveState = async (e) => {
        e.stopPropagation()
    };

    const toPlannerLink = async (e) => {
        e.stopPropagation()
    };

    return (
        <ListGroup style={{ position: 'fixed', zIndex: 99, top: props.point[0], left: props.point[1] }}>
            <ListGroup.Item className="bg-dark" onClick={ e => toPlannerLink(e)} style={{ color: 'white' }}>
                Send Plans by Time
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark" onClick={ e => saveState(e)} style={{ color: 'white' }}>
                Delete All
            </ListGroup.Item>
        </ListGroup>
    );
};

export default LeftClicker;

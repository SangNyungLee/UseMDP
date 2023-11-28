import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//props로 position을 줄것. 그럼 list그룹의 위치를 조절할 수 있다.
const LeftClicker = (props) => {
    //실제 예제에서는 여러 방법으로 Ref를 가져와야함.
    //혹은 html을 줘야함.
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //일단 로컬에 저장.
    const saveState = async () => {};

    const toPlannerLink = async () => {};
    console.log(props);

    return (
        <ListGroup style={{ position: 'fixed', zIndex: 99, top: props.point[0], left: props.point[1] }}>
            <ListGroup.Item className="bg-dark" onClick={toPlannerLink} style={{ color: 'white' }}>
                링크
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark" onClick={saveState} style={{ color: 'white' }}>
                다운로드
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark" style={{ color: 'white' }}>
                내로드맵으로
            </ListGroup.Item>
        </ListGroup>
    );
};

export default LeftClicker;

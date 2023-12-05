import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { calendarActions } from '../../../store/calendar';
import { pointActions } from '../../../store/pointer';
//props로 position을 줄것. 그럼 list그룹의 위치를 조절할 수 있다.
const LeftClicker = (props) => {
    //실제 예제에서는 여러 방법으로 Ref를 가져와야함.
    //혹은 html을 줘야함.
    const dispatch = useDispatch();
    const index = props.index;
    console.log(props);
    const pid = props.pid;

    const saveState = async (e) => {
        e.stopPropagation();
        dispatch(pointActions.clearPoint());
    };

    const toPlannerLink = async (e) => {
        e.stopPropagation();
        console.log(pid, index);
        dispatch(calendarActions.setQuote([pid, index]));
        dispatch(pointActions.clearPoint());
    };

    return (
        <ListGroup style={{ position: 'fixed', zIndex: 99, top: props.point[0], left: props.point[1] }}>
            <ListGroup.Item className="bg-dark" onClick={(e) => toPlannerLink(e)} style={{ color: 'white' }}>
                Show Plans
            </ListGroup.Item>
            {/* <ListGroup.Item className="bg-dark" onClick={(e) => saveState(e)} style={{ color: 'white' }}>
                Delete All
            </ListGroup.Item> */}
        </ListGroup>
    );
};

export default LeftClicker;

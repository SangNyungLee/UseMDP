import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { calendarActions } from '../../../store/calendar';
import { pointActions } from '../../../store/pointer';

const LeftClicker = (props) => {
    const dispatch = useDispatch();
    const index = props.index;
    const pid = props.pid;

    const toPlannerLink = async (e) => {
        e.stopPropagation();
        dispatch(calendarActions.setQuote([pid, index]));
        dispatch(pointActions.clearPoint());
    };

    return (
        <ListGroup style={{ position: 'fixed', zIndex: 99, top: props.point[0], left: props.point[1] }}>
            <ListGroup.Item onClick={(e) => toPlannerLink(e)} style={{ backgroundColor: '#EEEEEE', color: '#222831' }}>
                Show Plans
            </ListGroup.Item>
        </ListGroup>
    );
};

export default LeftClicker;

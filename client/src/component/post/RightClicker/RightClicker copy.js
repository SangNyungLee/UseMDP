import React from 'react';
import { ListGroup } from 'react-bootstrap';

const RightClickerForPlanner = (props) => {
    return (
        <ListGroup style={{ position: 'fixed', zIndex: 99, top: props.point[0], left: props.point[1] }}>
            <ListGroup.Item className="bg-dark" style={{ color: 'white' }}>
                링크
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark" style={{ color: 'white' }}>
                다운로드
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark" style={{ color: 'white' }}>
                내로드맵으로
            </ListGroup.Item>
        </ListGroup>
    );
};

export default RightClickerForPlanner;

import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useRef } from 'react';
import ThumbnailMaker from './ThumbnailMaker';

//props로 position을 줄것. 그럼 list그룹의 위치를 조절할 수 있다.
const RightClicker = (props) => {
    //실제 예제에서는 여러 방법으로 Ref를 가져와야함.
    //혹은 html을 줘야함.

    console.log(props);
    const thumnnailRef = useRef(null);
    function handleThumbnailDownload() {
        console.log('download', thumnnailRef.current);
        ThumbnailMaker(thumnnailRef);
    }

    return (
        <ListGroup style={{ position: 'absolute', zIndex: 99, top: props.point[0], left: props.point[1] }} ref={thumnnailRef}>
            <ListGroup.Item className="w-25 bg-dark" style={{ color: 'white' }}>
                File
            </ListGroup.Item>
            <ListGroup.Item className="w-25 bg-dark" style={{ color: 'white' }}>
                Link
            </ListGroup.Item>
            <ListGroup.Item onClick={handleThumbnailDownload} className="w-25 bg-dark" style={{ color: 'white' }}>
                Save
            </ListGroup.Item>
            <ListGroup.Item className="w-25 bg-dark" style={{ color: 'white' }}>
                Quit
            </ListGroup.Item>
        </ListGroup>
    );
};

export default RightClicker;

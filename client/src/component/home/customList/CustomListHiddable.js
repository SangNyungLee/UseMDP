import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pointActions } from '../../../store/pointer';
import RightClicker from '../../post/RightClicker/RightClicker';

export default function CustomListHiddable(props) {
    const dispatch = useDispatch();
    const pointer = useSelector((state) => state.pointer);
    const [hide, setHide] = useState(true);
    const [rightClickData, setRightClickData] = useState([]);
    const data = props.datas;
    const CustomLoadMap = props.loadMap;
    const handleRightClick = (e, title, plannerId) => {
        e.preventDefault();
        setRightClickData([title, plannerId]);
        dispatch(pointActions.setPoint([e.clientY, e.clientX]));
    };

    return (
        <>
            {pointer[0] !== -1 && pointer[1] !== -1 && <RightClicker rightClickData={rightClickData} point={pointer} />}

            <Container>
                <Row style={{ justifyContent: 'space-between', padding: hide ? '15px 0' : 0 }}>
                    {data.map((item, idx) => (
                        <Col key={item.plannerId}>
                            <div onContextMenu={(e) => handleRightClick(e, item.title, item.plannerId)}>
                                <CustomLoadMap datas={item} />
                            </div>
                        </Col>
                    ))}
                    {Array.from({ length: Math.max(4 - (data.length % 4), 0) }).map((_, i) => (
                        <Col key={`empty-${i}`}></Col>
                    ))}
                </Row>
            </Container>

            <br />
            <div>
                <Button
                    className="w-25 float-end"
                    onClick={(e) => {
                        e.stopPropagation()
                        setHide(!hide);
                    }}
                >
                    {hide ? '더보기' : '접기'}
                </Button>
            </div>
        </>
    );
}

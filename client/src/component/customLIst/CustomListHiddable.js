import LoadMap from '../LoadMap';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import RightClicker from '../post/RightClicker/RightClicker';

export default function CustomListHiddable(props) {
    const [hide, setHide] = useState(true);
    const [rightClickData, setRightClickData] = useState([]);
    console.log(props.datas);
    const data = props.datas;
    const [point, setPoint] = props.points;
    const handleRightClick = (e, newTitle, newId) => {
        e.preventDefault();
        setRightClickData([newTitle, newId]);
        setPoint([e.clientY, e.clientX]);
    };
    return (
        <>
            {point[0] !== -1 && point[1] !== -1 ? <RightClicker rightClickData={rightClickData} point={point}></RightClicker> : null}

            {data.map((_, idx) => {
                // 컨테이너를 만든다.
                if (idx === 0) {
                    return (
                        <Container key={idx} style={{ marginTop: '30px' }}>
                            <Row style={{ justifyContent: 'space-between' }}>
                                {Array.from({ length: Math.min(4, data.length) }).map((_, i) => (
                                    <Col key={data[i].plannerId}>
                                        <div onContextMenu={(e) => handleRightClick(e, data[i].title, data[i].plannerId)}>
                                            <LoadMap datas={data[i]}></LoadMap>
                                        </div>
                                    </Col>
                                ))}
                                {Array.from({ length: 4 - data.length }).map((_, i) => (
                                    <Col key={`empty-${i}`}></Col>
                                ))}
                            </Row>
                        </Container>
                    );
                } else if (hide) {
                    return null;
                } else if (!hide && idx % 4 === 0) {
                    const endIdx = Math.min(idx + 3, data.length - 1);
                    return (
                        <Container style={{ marginTop: '30px' }}>
                            <Row>
                                {Array.from({ length: endIdx - idx + 1 }).map((_, i) => (
                                    <Col key={data[idx + i].plannerId}>
                                        <div onContextMenu={handleRightClick}>
                                            <LoadMap datas={data[idx + i]}></LoadMap>
                                        </div>
                                    </Col>
                                ))}
                                {/* 4개를 채워서 칸을 채우는것
                    그냥 Grid쓸껄 ㅇㅁㄻㄴㅇㄹㄴㅁㅇㄹ */}
                                {Array.from({ length: 4 - (endIdx - idx + 1) }).map((_, i) => (
                                    <Col key={`empty-${i}`}></Col>
                                ))}
                            </Row>
                        </Container>
                    );
                }
            })}
            {/* hide===true면 접고, false면 펼수 있도록. */}
            <br />
            {hide ? (
                <div>
                    <Button
                        variant="success"
                        className="w-25 float-end"
                        onClick={() => {
                            setHide(false);
                        }}
                    >
                        더보기
                    </Button>
                </div>
            ) : (
                <div>
                    <Button
                        className="w-25 float-end"
                        onClick={() => {
                            setHide(true);
                        }}
                    >
                        접기
                    </Button>
                </div>
            )}
        </>
    );
}
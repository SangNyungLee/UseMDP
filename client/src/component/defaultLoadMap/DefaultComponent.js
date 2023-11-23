import axios from 'axios';
import { useEffect, useState } from 'react';
import base64Str from '../../constant/ImageBase64';
import { Spinner } from 'react-bootstrap';

import CustomList from '../customLIst/CustomList';
import CustomListHiddable from '../customLIst/CustomListHiddable';
export default function DefaultComponent() {
    const [data, setData] = useState([]);
    const [point, setPoint] = useState([-1, -1]);

    // const handleRightClick = (e, newTitle, newId) => {
    //     e.preventDefault();
    //     setRightClickData([newTitle, newId]);
    //     setPoint([e.clientY, e.clientX]);
    // };

    const handlePoint = () => {
        if (point[0] !== -1 && point[1] !== -1) {
            setPoint([-1, -1]);
        }
    };
    useEffect(() => {
        async function getData() {
            try {
                const result = await axios.get('/api/getPlanner/default');
                setData(result.data);
            } catch {
                console.log('error');
                setData([
                    { plannerId: 1, creator: '123', title: '230303', likePlanner: 1, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                    { plannerId: 2, creator: '234', title: '230304', likePlanner: 2, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                    { plannerId: 3, creator: '456', title: '230305', likePlanner: 3, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                    { plannerId: 4, creator: '123', title: '230303', likePlanner: 1, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                    { plannerId: 5, creator: '234', title: '230304', likePlanner: 2, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                    { plannerId: 6, creator: '456', title: '230305', likePlanner: 3, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                ]);
            }
        }
        getData();
    }, []);

    if (data.length === 0) {
        return (
            //Spinner
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    } else {
        return (
            <div style={{ padding: '15px' }} onClick={handlePoint}>
                <h2>기본로드맵</h2>

                {/* plan을 4개씩 출력함. 그런데 idx가 3에서 더보기 버튼을 만들고, 아래는 가려진 상태로 만든다.
                7,11이 되면 Container를 만들고  */}

                <CustomListHiddable datas={data} points={[point, setPoint]}></CustomListHiddable>
                <h2 style={{ marginTop: '50px' }}>내 로드맵</h2>
                <CustomList datas={data}></CustomList>
            </div>
        );
    }
}

{
    /* <Row style={{ marginTop: '30px' }}>
<Col>
    <div key={data[0].plannerId}>
        <LoadMap datas={data[0]}></LoadMap>
    </div>
</Col>
<Col>
    <div key={data[1].plannerId}>
        <LoadMap datas={data[1]}></LoadMap>
    </div>
</Col>
<Col>
    <div key={data[2].plannerId}>
        <LoadMap datas={data[2]}></LoadMap>
    </div>
</Col>
<Col>
    <div key={data[3].plannerId}>
        <LoadMap datas={data[3]}></LoadMap>
    </div>
</Col>
</Row>
<Row style={{ marginTop: '30px' }}>
{hide ? (
    <>
        <Col>
            <div key={data[4].plannerId}>
                <LoadMap datas={data[4]}></LoadMap>
            </div>
        </Col>
        <Col>
            <div key={data[5].plannerId}>
                <LoadMap datas={data[5]}></LoadMap>
            </div>
        </Col>
        <Col></Col>
        <Col></Col>

    </>
) : (
    <div>
        <Button
            className="w-25 float-end"
            onClick={() => {
                setHide(true);
            }}
        >
            더보기
        </Button>
    </div>
)}
</Row> */
}

// {point[0] !== -1 && point[1] !== -1 ? <RightClicker rightClickData={rightClickData} point={point}></RightClicker> : null}

// {data.map((_, idx) => {
//     // 컨테이너를 만든다.
//     if (idx === 0) {
//         return (
//             <Container key={idx} style={{ marginTop: '30px' }}>
//                 <Row>
//                     {Array.from({ length: Math.min(4, data.length) }).map((_, i) => (
//                         <Col key={data[i].plannerId}>
//                             <div onContextMenu={(e) => handleRightClick(e, data[i].title, data[i].plannerId)}>
//                                 <LoadMap datas={data[i]}></LoadMap>
//                             </div>
//                         </Col>
//                     ))}
//                 </Row>
//             </Container>
//         );
//     } else if (hide) {
//         return null;
//     } else if (!hide && idx % 4 === 0) {
//         const endIdx = Math.min(idx + 3, data.length - 1);
//         return (
//             <Container style={{ marginTop: '30px' }}>
//                 <Row>
//                     {Array.from({ length: endIdx - idx + 1 }).map((_, i) => (
//                         <Col key={data[idx + i].plannerId}>
//                             <div onContextMenu={handleRightClick}>
//                                 <LoadMap datas={data[idx + i]}></LoadMap>
//                             </div>
//                         </Col>
//                     ))}
//                     {/* 4개를 채워서 칸을 채우는것
//                     그냥 Grid쓸껄 ㅇㅁㄻㄴㅇㄹㄴㅁㅇㄹ */}
//                     {Array.from({ length: 4 - (endIdx - idx + 1) }).map((_, i) => (
//                         <Col key={`empty-${i}`}></Col>
//                     ))}
//                 </Row>
//             </Container>
//         );
//     }
// })}
// {/* hide===true면 접고, false면 펼수 있도록. */}
// {hide ? (
//     <div>
//         <Button
//             className="w-25 float-end"
//             onClick={() => {
//                 setHide(false);
//             }}
//         >
//             더보기
//         </Button>
//     </div>
// ) : (
//     <div>
//         <Button
//             className="w-25 float-end"
//             onClick={() => {
//                 setHide(true);
//             }}
//         >
//             접기
//         </Button>
//     </div>
// )}

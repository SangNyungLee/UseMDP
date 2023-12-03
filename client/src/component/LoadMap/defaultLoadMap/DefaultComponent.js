import MyLoadMap from '../MyLoadMap';

import { useEffect, useState } from 'react';
import CustomList from '../../home/customList/CustomList';
import CustomListHiddable from '../../home/customList/CustomListHiddable';
import { useDispatch } from 'react-redux';
import { getLikesAxios, getPlannerByBasic } from '../../../utils/DataAxios';
import { useSelector } from 'react-redux';
import { likeActions } from '../../../store/like';
import { _ComponentTitle } from '../../../constant/css/styledComponents/__HomeComponent';
import noResult from '../../../constant/img/searchFail.svg';
import { HOME } from '../../../constant/constant';
import useDefaultCheck from '../../../hook/useDefaultCheck';
export default function DefaultComponent() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [point, setPoint] = useState([-1, -1]);
    const like = useSelector((state) => state.like);
    const plannerList = useSelector((state) => state.plannerList);
    useDefaultCheck(HOME);
    console.log('플래너', plannerList, data);
    const handlePoint = () => {
        if (point[0] !== -1 && point[1] !== -1) {
            setPoint([-1, -1]);
        }
    };

    useEffect(() => {
        async function getData() {
            try {
                const response = await getPlannerByBasic();
                console.log('res : ', response.data);
                if (response.data.data.length == 0) {
                } else {
                    const newData = response.data.data.map((item, idx) => {
                        const newItem = { ...item, cards: item.cards ? item.cards : [] };
                        return newItem;
                    });
                    setData(newData);
                }
            } catch {
                console.log('error');
                setData([]);
            }
        }

        async function getLike() {
            const likes = await getLikesAxios();
            console.log('defaultComponent의 like' + JSON.stringify(likes));
            dispatch(likeActions.setLikesInit(likes));
        }

        getData();
        getLike();
    }, []);

    return (
        <div onClick={handlePoint}>
            <_ComponentTitle>Default LoadMap</_ComponentTitle>
            {data.length == 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '20vh' }}>
                    <img style={{ width: '200px', height: '200px', marginRight: '10px' }} src={noResult} />
                    <div>
                        <div style={{ fontSize: '25px' }}> 찾고자 하는 데이터가 없습니다</div>
                        <div style={{ fontSize: '20px', fontWeight: '300', color: 'gray', marginTop: '10px' }}></div>
                    </div>
                </div>
            ) : (
                <CustomListHiddable datas={data} points={[point, setPoint]} />
            )}

            <_ComponentTitle style={{ marginTop: '50px' }}>My Planners</_ComponentTitle>
            {plannerList.length == 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '20vh' }}>
                    <img style={{ width: '200px', height: '200px', marginRight: '10px' }} src={noResult} />
                    <div>
                        <div style={{ fontSize: '25px' }}> 아직 로드맵을 생성하지 않았어요.</div>
                        <div style={{ fontSize: '20px', fontWeight: '300', color: 'gray', marginTop: '10px' }}>데이터를 추가하시겠어요?</div>
                    </div>
                </div>
            ) : (
                <CustomList datas={plannerList} loadMap={MyLoadMap}></CustomList>
            )}
        </div>
    );
}

{
    /* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
<img style={{ width: '200px', height: '200px', marginRight: '10px' }} src={noResult} />
<div>
    <div style={{ fontSize: '25px' }}> 찾고자 하는 데이터가 없습니다</div>
    <div style={{ fontSize: '20px', fontWeight: '300', color: 'gray', marginTop: '10px' }}> 다른 검색어로 검색을 해주세요.</div>
</div>
</div> */
}

// if (data.length == 0) {
//     return (
//         //Spinner

//         <div>
//             <_componentTitle>찾은 데이터가 없습니다!</_componentTitle>
//             <div
//                 style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     minHeight: '60vh',
//                 }}
//             >
//                 <Spinner animation="border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </Spinner>
//             </div>
//         </div>
//     );
// } else {

// {/* plan을 4개씩 출력함. 그런데 idx가 3에서 더보기 버튼을 만들고, 아래는 가려진 상태로 만든다.
// 7,11이 되면 Container를 만들고  */}
// {point[0] !== -1 && point[1] !== -1 ? <RightClicker rightClickData={rightClickData} point={point}></RightClicker> : null}

// {data.map((_, idx) => {
//     // 컨테이너를 만든다.
//     if (idx == 0) {
//         return (
//             <Container key={idx} style={{ marginTop: '30px' }}>
//                 <Row style={{ marginBottom: '25px' }}>
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
//     } else if (!hide && idx % 4 == 0) {
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
// {/* hide==true면 접고, false면 펼수 있도록. */}
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

/*                 {data.map((_, idx) => {
                    // 컨테이너를 만든다.
                    if (idx == 0) {
                        return (
                            <Container key={idx} style={{ marginTop: '30px' }}>
                                <Row>
                                    {Array.from({ length: Math.min(4, data.length) }).map((_, i) => (
                                        <Col key={data[i].plannerId}>
                                            <div onContextMenu={(e) => handleRightClick(e, data[i].title, data[i].plannerId)}>
                                                <MyLoadMap datas={data[i]}></MyLoadMap>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        );
                    } else if (idx % 4 == 0) {
                        const endIdx = Math.min(idx + 3, data.length - 1);
                        return (
                            <Container style={{ marginTop: '30px' }}>
                                <Row>
                                    {Array.from({ length: endIdx - idx + 1 }).map((_, i) => (
                                        <Col key={data[idx + i].plannerId}>
                                            <div onContextMenu={handleRightClick}>
                                                <MyLoadMap datas={data[idx + i]}></MyLoadMap>
                                            </div>
                                        </Col>
                                    ))}
                                    {/* 4개를 채워서 칸을 채우는것
                                    // 그냥 Grid쓸껄 ㅇㅁㄻㄴㅇㄹㄴㅁㅇㄹ */
// {Array.from({ length: 4 - (endIdx - idx + 1) }).map((_, i) => (
//     <Col key={`empty-${i}`}></Col>
//                     ))}
//                 </Row>
//             </Container>
//         );
//     } else {
//         return null;
//     }
// })}

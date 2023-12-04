import axios from 'axios';
import { useEffect, useState } from 'react';
import base64Str from '../../../constant/ImageBase64';
import { Spinner } from 'react-bootstrap';
import CustomList from '../customList/CustomList';
import CustomListHiddable from '../customList/CustomListHiddable';
import MyLoadMap from '../../LoadMap/MyLoadMap';
import LoadMap from '../../LoadMap/LoadMap';
import { useSelector, useDispatch } from 'react-redux';
import { plannerListActions } from '../../../store/plannerList';
import { getLikes, getLikesAxios, getPlannerByTrend } from '../../../utils/DataAxios';
import { likeActions } from '../../../store/like';
import noResult from '../../../constant/img/searchFail.svg';
import { _ComponentTitle } from '../../../constant/css/styledComponents/__HomeComponent';
import { requestFail } from '../../etc/SweetModal';
import { HOME } from '../../../constant/constant';
import useDefaultCheck from '../../../hook/useDefaultCheck';
export default function StarComponent() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [point, setPoint] = useState([-1, -1]);
    const plannerList = useSelector((state) => state.plannerList);
    useDefaultCheck(HOME);
    const handlePoint = () => {
        if (point[0] !== -1 && point[1] !== -1) {
            setPoint([-1, -1]);
        }
    };
    useEffect(() => {
        async function getData() {
            try {
                const response = await getPlannerByTrend();
                if( response.status === 200){
                    const newData = response.data.data.map((item, idx) => {
                        const newItem = { ...item, cards: item.cards ? item.cards : [] };
                        return newItem;
                    });
                    setData(newData);
                } else {
                    requestFail("트랜드 플래너 불러오기")
                }
            } catch {
                console.log('error');
                setData([]);
            }
        }

        async function getLike() {
            const result = await getLikesAxios();
            if(result.status === 200){
                dispatch(likeActions.setLikesInit(result.data));
            } else {
                requestFail("좋아요 불러오기")
            }
        }

        getData();
        getLike();
    }, []);

    return (
        <div style={{ padding: '15px' }} onClick={handlePoint}>
            <_ComponentTitle>Star LoadMap</_ComponentTitle>

            {data.length == 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '20vh' }}>
                    <img style={{ width: '200px', height: '200px', marginRight: '10px' }} src={noResult} />
                    <div>
                        <div style={{ fontSize: '25px' }}> 해당하는 데이터가 없어요..</div>
                    </div>
                </div>
            ) : (
                <CustomListHiddable datas={data} loadMap={LoadMap} points={[point, setPoint]} />
            )}
            {/* plan을 4개씩 출력함. 그런데 idx가 3에서 더보기 버튼을 만들고, 아래는 가려진 상태로 만든다.
                7,11이 되면 Container를 만들고  */}

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

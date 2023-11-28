import axios from 'axios';
import { useEffect, useState } from 'react';
import base64Str from '../../../constant/ImageBase64';
import { Spinner } from 'react-bootstrap';
import CustomList from '../customList/CustomList';
import CustomListHiddable from '../customList/CustomListHiddable';
import MyLoadMap from '../../LoadMap/MyLoadMap';
import LoadMap from '../../LoadMap/LoadMap';
import { useDispatch } from 'react-redux';
import { plannerListActions } from '../../../store/plannerList';
export default function StarComponent() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const [point, setPoint] = useState([-1, -1]);

    const handlePoint = () => {
        if (point[0] !== -1 && point[1] !== -1) {
            setPoint([-1, -1]);
        }
    };
    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get('http://localhost:8080/api/getPlanner/trending');
                console.log('res : ', response.data);
                if (response.data.data.length == 0) {
                } else {
                    const newData = response.data.data.map((item, idx) => {
                        const newItem = { ...item, cards: item.cards ? item.cards : [] };
                        return newItem;
                    });
                    setData(newData);
                    dispatch(plannerListActions.setPlannersInit(newData));
                }
            } catch {
                console.log('error');
                setData([
                    { plannerId: 1, creator: '123', title: '230303', likePlanner: 1, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cards: null, description: '123' },
                    { plannerId: 2, creator: '234', title: '230304', likePlanner: 2, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cards: null, description: '123' },
                    { plannerId: 3, creator: '456', title: '230305', likePlanner: 3, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cards: null, description: '123' },
                    { plannerId: 4, creator: '123', title: '230303', likePlanner: 1, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cards: null, description: '123' },
                    { plannerId: 5, creator: '234', title: '230304', likePlanner: 2, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cards: null, description: '123' },
                    { plannerId: 6, creator: '456', title: '230305', likePlanner: 3, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cards: null, description: '123' },
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
                <h2>인기 로드맵</h2>
                <CustomListHiddable datas={data} points={[point, setPoint]} loadMap={LoadMap}></CustomListHiddable>
                {/* plan을 4개씩 출력함. 그런데 idx가 3에서 더보기 버튼을 만들고, 아래는 가려진 상태로 만든다.
                7,11이 되면 Container를 만들고  */}

                <h2 style={{ marginTop: '50px' }}>내 로드맵</h2>

                <CustomList datas={data} loadMap={MyLoadMap}></CustomList>
            </div>
        );
    }
}

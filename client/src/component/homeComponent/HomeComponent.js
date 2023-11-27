import { useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { plannerListActions } from '../../store/plannerList';
import base64Str from '../../constant/ImageBase64';
import CustomList from '../customLIst/CustomList';
import MyLoadMap from '../LoadMap2/MyLoadMap';
import copy from 'fast-copy';
const statusIndexMap = {
    TODO: 0,
    DOING: 1,
    DONE: 2,
};

export default function HomeComponent() {
    //이미 저장된 값이 있으면 그 list를 불러온다.
    const [data, setData] = useLocalStorage('List', '');

    const dispatch = useDispatch();
    console.log(data);
    useEffect(() => {
        async function fetchData() {
            const testData = [
                { plannerId: 1, creator: '123', title: '230303', likePlanner: 1, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                { plannerId: 2, creator: '234', title: '230304', likePlanner: 2, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                { plannerId: 3, creator: '456', title: '230305', likePlanner: 3, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
            ];
            // const response = await axios.get('/api/myplanner');
            try {
                const response = await axios.get('http://localhost:8080/api/getPlanners');
                console.log('res : ', response.data);
                if (response.data.length == 0) {
                    setData(testData);

                    dispatch(plannerListActions.setPlannersInit(testData));
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

                setData(testData);
                dispatch(plannerListActions.setPlannersInit(testData));
            }
        }
        fetchData();
    }, [setData, dispatch]);

    return (
        <div style={{ padding: '15px' }}>
            <h2 style={{ marginTop: '15px' }}>내 로드맵</h2>
            <CustomList datas={data} loadMap={MyLoadMap}></CustomList>
        </div>
    );
}

import { useEffect, useState } from 'react';
import CustomList from '../customList/CustomList';
import CustomListHiddable from '../customList/CustomListHiddable';
import MyLoadMap from '../../LoadMap/MyLoadMap';
import LoadMap from '../../LoadMap/LoadMap';
import { useSelector, useDispatch } from 'react-redux';
import { getLikesAxios, getPlannerByTrend } from '../../../utils/DataAxios';
import { likeActions } from '../../../store/like';
import { _ComponentContainer, _ComponentTitle } from '../../../constant/css/styledComponents/__StarComponent';
import { requestFail } from '../../etc/SweetModal';
import { HOME } from '../../../constant/constant';
import useDefaultCheck from '../../../hook/useDefaultCheck';

export default function StarComponent() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [point, setPoint] = useState([-1, -1]);
  const plannerList = useSelector( state => state.plannerList );

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
        if (response.status === 200) {
          const newData = response.data.data.map((item, idx) => {
            const newItem = { ...item, cards: item.cards ? item.cards : [] };
            return newItem;
          });
          setData(newData);
        } else {
          requestFail('트랜드 플래너 불러오기');
        }
      } catch {
        setData([]);
      }
    }

		async function getLike() {
			const result = await getLikesAxios();
			if (result.status === 200) {
				dispatch(likeActions.setLikesInit(result.data.data));
			} else {
				requestFail("좋아요 불러오기");
			}
		}

		getData();
		getLike();
	}, []);


  return (
    <_ComponentContainer fluid onClick={handlePoint}>
      <_ComponentTitle>TRENDING</_ComponentTitle>

      <CustomListHiddable
        datas={data}
        loadMap={LoadMap}
        points={[point, setPoint]}
      />

      <_ComponentTitle style={{ marginTop: "50px" }}>
        My Planners
      </_ComponentTitle>

      <CustomList datas={plannerList} loadMap={MyLoadMap}></CustomList>
    </_ComponentContainer>
  );
}

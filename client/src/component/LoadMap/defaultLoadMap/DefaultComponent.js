import { useEffect, useState } from 'react';
import CustomListHiddable from '../../home/customList/CustomListHiddable';
import { useDispatch } from 'react-redux';
import { getLikesAxios, getPlannerByBasic } from '../../../utils/DataAxios';
import { useSelector } from 'react-redux';
import { likeActions } from '../../../store/like';
import { HOME } from '../../../constant/constant';
import useDefaultCheck from '../../../hook/useDefaultCheck';
import { requestFail } from '../../etc/SweetModal';
import { _ComponentContainer, _ComponentTitle } from '../../../constant/css/styledComponents/__DefaultComponent';
import LoadMap from '../LoadMap';
import NoContent from '../../NoContent';

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
				if (response.status === 200) {
					const newData = response.data.data.map((item, idx) => {
						const newItem = { ...item, cards: item.cards ? item.cards : [] };
						return newItem;
					});
					setData(newData);
					// setData([]);
				} else {
					requestFail('기본 플래너 불러오기');
				}
			} catch {
				console.log('error');
				setData([]);
			}
		}
		async function getLike() {
			const result = await getLikesAxios();
            if (result.status === 200) {
                dispatch(likeActions.setLikesInit(result.data));
            } else {
                requestFail('좋아요 불러오기');
            }
		}

		getData();
		getLike();
	}, []);

	return (
		<>
			<_ComponentContainer onClick={handlePoint} $fluid>
				<_ComponentTitle>Templates</_ComponentTitle>
				{data.length == 0 ? (
					<NoContent />
				) : (
					<CustomListHiddable datas={data} points={[point, setPoint]} loadMap={LoadMap} />
				)}
			</_ComponentContainer>
		</>
	);
}

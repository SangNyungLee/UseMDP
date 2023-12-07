import { useEffect, useState } from 'react';
import CustomListHiddable from '../../home/customList/CustomListHiddable';
import { getPlannerByBasic } from '../../../utils/DataAxios';
import { HOME } from '../../../constant/constant';
import useDefaultCheck from '../../../hook/useDefaultCheck';
import { requestFail } from '../../etc/SweetModal';
import { _ComponentContainer, _ComponentTitle } from '../../../constant/css/styledComponents/__DefaultComponent';
import LoadMap from '../LoadMap';
import NoContent from '../../NoContent';
import useGetData from '../../../hook/useGetData';

export default function DefaultComponent() {
	const [data, setData] = useState([]);
	const [point, setPoint] = useState([-1, -1]);
	useDefaultCheck(HOME);

	const handlePoint = () => {
		if (point[0] !== -1 && point[1] !== -1) {
			setPoint([-1, -1]);
		}
	};

	const { getLikeAndDispatch } = useGetData()

	useEffect(() => {
		async function getData() {
			try {
				const response = await getPlannerByBasic();
				if (response.status === 200) {
					const newData = response.data.data.map(item => ({ ...item, cards: item.cards ? item.cards : [] }));
					setData(newData);
				} else {
					requestFail('기본 플래너 불러오기');
				}
			} catch {
				setData([]);
			}
		}

		getLikeAndDispatch()
		getData();
	}, []);

	return (
		<>
			<_ComponentContainer onClick={handlePoint} $fluid id='_ComponentContainerDEFAULT'>
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

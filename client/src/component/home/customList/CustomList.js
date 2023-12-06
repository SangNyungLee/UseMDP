import PlusMap from '../../LoadMap/PlusMap';
import { Fade } from 'react-awesome-reveal';
import { _Row, _Col, _Container } from '../../../constant/css/styledComponents/__CustomList';
import { useEffect, useState } from 'react';

export default function CustomList(props) {
	const data = props.datas;
	const [sortedData, setSortedData] = useState([]);
	const sortOption = props.sortOption;

	useEffect(() => {
		if (data) {
			setSortedData(sortedItems(data, sortOption));
		}
	}, [data, sortOption]);

	const sortedItems = (data, option) => {
		switch (option) {
			case 'title':
				return data.slice().sort((a, b) => a.title.localeCompare(b.title));
			case 'createdAt':
				return data.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
			case 'updatedAt':
				return data.slice().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
			default:
				return data.slice();
		}
	};

	const noPlus = props.noPlus;

	const CustomLoadMap = props.loadMap;

	return (
		<_Container $fluid id={'CustomList'}>
			<Fade direction={'up'} duration={500} cascade triggerOnce>
				<_Row xs={'auto'} xl={4} id={'ROW'}>
					{sortedData.map((planner, idx) => {
						return (
							<_Col id='_Col' key={idx + 1}>
								<CustomLoadMap datas={planner} />
							</_Col>
						);
					})}
					{noPlus ? null : (
						<_Col>
							<PlusMap />
						</_Col>
					)}
				</_Row>
			</Fade>
		</_Container>
	);
}

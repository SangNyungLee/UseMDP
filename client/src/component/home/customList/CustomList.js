import PlusMap from '../../LoadMap/PlusMap';
import { Fade } from 'react-awesome-reveal';
import { _Row, _Col, _Container } from '../../../constant/css/styledComponents/__CustomList';

export default function CustomList(props) {
	const data = props.datas;
	const noPlus = props.noPlus;
	console.log('data', data);

	const CustomLoadMap = props.loadMap;

	return (
		<_Container fluid id={'CustomList'}>
			<Fade direction={'up'} duration={500} cascade triggerOnce>
				<_Row xs={'auto'} xl={4}>
					{data.map((planner, idx) => {
						return (
							<_Col key={idx + 1}>
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

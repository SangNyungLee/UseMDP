import CustomList from './customList/CustomList';
import MyLoadMap from '../LoadMap/MyLoadMap';
import useDefaultCheck from '../../hook/useDefaultCheck';
import { HOME } from '../../constant/constant';
import { useSelector, useDispatch } from 'react-redux';
// Styled Components
import { _ComponentContainer, _ComponentTitle } from '../../constant/css/styledComponents/__HomeComponent';

const statusIndexMap = {
	TODO: 0,
	DOING: 1,
	DONE: 2,
};

export default function HomeComponent() {
	//이미 저장된 값이 있으면 그 list를 불러온다.

	const plannerList = useSelector((state) => state.plannerList);
	const calendar = useSelector((state) => state.calendar);
	useDefaultCheck(HOME);

	console.log('hom component calendar', calendar);
	console.log('home component', plannerList);

	return (
		<_ComponentContainer fluid id={'_ComponentContainer'}>
			<_ComponentTitle id={'_ComponentTitle'}>MY PLANNERS</_ComponentTitle>
			<CustomList datas={plannerList} loadMap={MyLoadMap} id={'CustomList'}></CustomList>

			{/* <_Container fluid>
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
			</_Container> */}
		</_ComponentContainer>
	);
}

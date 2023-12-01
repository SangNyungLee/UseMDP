import { Container, Row, Col } from 'react-bootstrap';
import PlusMap from '../../LoadMap/PlusMap';
import LoadMap from '../../LoadMap/LoadMap';
import MyLoadMap from '../../LoadMap/MyLoadMap';

export default function CustomList(props) {
	const data = props.datas;

	console.log('data', data);

	const CustomLoadMap = props.loadMap;

	//이게 4의 배수면 plusmap을 새로운 Row에 넣어야한다.
	const isMultipleOfFour = data.length % 4 === 0;
	const lastIdx = data.length - 1;
	// console.log('isMultipleOfFour', isMultipleOfFour);
	// data.push(<PlusMap></PlusMap>);
	// console.log('data with PlusMap', data);

	return (
		<>
			<Row xs={2} md={3} lg={4}>
				{data.map((planner, idx) => {
					return (
						<Col key={idx + 1}>
							<CustomLoadMap datas={planner} />
						</Col>
					);
				})}
				<Col>
					<PlusMap />
				</Col>
			</Row>

			{/* <Container>
				{data.map((item, idx) => {
					if (idx % 4 === 0) {
						// Start a new row
						return (
							<Row key={`row-${idx / 4}`} style={{ marginTop: idx !== 0 ? '30px' : 0 }}>
								{[...Array(4)].map((_, i) => (
									<Col key={data[idx + i]?.plannerId}>
										{data[idx + i] && <CustomLoadMap datas={data[idx + i]}></CustomLoadMap>}
									</Col>
								))}
							</Row>
						);
					}
					return null; //4의 배수가 아니라면 null
				})} */}
			{/* 마지막 4의 배수라면 줄을 바꿔서 PlusMap을 넣어야함. */}
			{/* {isMultipleOfFour && (
				<Row style={{ marginTop: '30px' }}>
					{[...Array(Math.max(4 - (data.length % 4), 1))].map((_, i) => (
						<Col key={`empty-${i}`}>{i === 0 && <PlusMap></PlusMap>}</Col>
					))}
				</Row>
			)} */}
			{/* </Container> */}
		</>
	);
}

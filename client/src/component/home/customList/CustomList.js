import { Container, Row, Col } from 'react-bootstrap';
import PlusMap from '../../LoadMap/PlusMap';
import LoadMap from '../../LoadMap/LoadMap';

export default function CustomList(props) {
	const data = props.datas;
	console.log('css', data);
	//이게 4의 배수면 plusmap을 새로운 Row에 넣어야한다.
	const isMultipleOfFour = data.length % 4 === 0;
	const lastIdx = data.length - 1;
	return (
		<Container>
			<PlusMap></PlusMap>
			{data.map((item, idx) => {
				if (idx % 4 === 0) {
					// Start a new row
					return (
						<Row key={`row-${idx / 4}`} style={{ marginTop: idx !== 0 ? '30px' : 0 }}>
							{[...Array(4)].map((_, i) => (
								<Col key={data[idx + i]?.plannerId}>
									{data[idx + i] && <LoadMap datas={data[idx + i]}/>}
								</Col>
							))}
						</Row>
					);
				}
				return null; //4의 배수가 아니라면 null
			})}
			{/* 마지막 4의 배수라면 줄을 바꿔서 PlusMap을 넣어야함. */}
			{isMultipleOfFour && (
				<Row style={{ marginTop: '30px' }}>
					{[...Array(Math.max(4 - (data.length % 4), 1))].map((_, i) => (
						<Col key={`empty-${i}`}>{i === 0 && <PlusMap></PlusMap>}</Col>
					))}
				</Row>
			)}
		</Container>
	);
}

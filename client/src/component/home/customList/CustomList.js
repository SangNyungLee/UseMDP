import PlusMap from '../../LoadMap/PlusMap';
import { Fade } from 'react-awesome-reveal';
import { _Row, _Col, _Container } from '../../../constant/css/styledComponents/__CustomList';
import { useEffect, useState } from 'react';

export default function CustomList(props) {
    const data = props.datas;
    const [ sortedData, setSortedData ] = useState([]);
    const sortOption = props.sortOption

    useEffect(()=>{
        if(data){
            setSortedData(sortedItems(data,sortOption));
        }
    },[data,sortOption])

    const sortedItems = (data,option) => {
        switch(option){
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
    console.log('custom data', data);

    const CustomLoadMap = props.loadMap;

    //이게 4의 배수면 plusmap을 새로운 Row에 넣어야한다.
    const isMultipleOfFour = sortedData.length % 4 === 0;
    const lastIdx = sortedData.length - 1;
    // console.log('isMultipleOfFour', isMultipleOfFour);
    // data.push(<PlusMap></PlusMap>);
    // console.log('data with PlusMap', data);

    return (
        <>
            <_Container fluid>
                <Fade direction={'up'} duration={500} cascade triggerOnce>
                    <_Row xs={2} sm={2} md={4} lg={4} xl={4} xxl={4}>
                        {sortedData.map((planner, idx) => {
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

import Footer from '../component/Footer';
import Header from '../component/Header';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Container, Image, Row, Col, Card, Button, Stack } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import useDefaultCheck from '../hook/useDefaultCheck';
import FileInputComponent from '../component/FileInputComponent';
import { requestFail } from '../component/etc/SweetModal';
import { readPlanner } from '../utils/DataAxiosParsing';
import { plannerListActions } from '../store/plannerList';
import { useDispatch } from 'react-redux';
import { calendarActions } from '../store/calendar';
import { validatePlannerData, validateUnspecifiedPlannerData } from '../utils/DataValidate';
import { noEditPlannerAction } from '../store/noEditPlanner';

export default function WelcomePage() {

	const isMobile = useMediaQuery({
		query: '(max-width: 576px)',
	});

	const location = useLocation();
	const [ message, setMessage ] = useState( location.state?.message || "" );
	console.log("message",message);

	//이건 확인해봐야 함
	const [ visible, setIsVisible ] = useState( message? true : false )
	console.log("visible",visible)


	const { naviCookieCheck } = useDefaultCheck();
	const dispatch = useDispatch();

	const [ readFile, setReadFile ] = useState();
	const navi = useNavigate();

	useEffect(()=>{
		if(readFile){
			const data = JSON.parse(readFile)
            if (validateUnspecifiedPlannerData(data)) {
				dispatch(noEditPlannerAction.setPlansInit(data))
				navi('/plannerNoEdit',{
					state:{
						sourceData: data,
					}
				})
			} else {
				requestFail("플래너 불러오기","데이터가 올바르지 않습니다")
			}
		}
	},[readFile])

	const readPlannerData = async (data,specified) => {
        const result = await readPlanner(data,specified);
        if(result){
            const { plannerId } = result
            dispatch(plannerListActions.addPlanner(result))
            dispatch(calendarActions.setAll([plannerId]))
        } else {
            requestFail("데이터")
        }
    }

	return (
		<>
			<Container className='px-5' style={{ height: '600px', paddingTop: '180px' }}>
				<Row xs={1} sm={1} md={2}>
					<Col className='mb-5'>
						<Stack gap={3}>
							<h1>Security-first diagramming for teams.</h1>
							<p>Bring your storage to our online tool, or save locally with the desktop app.</p>
						</Stack>
						<Stack direction={isMobile ? 'vertical' : 'horizontal'} id='target' gap={5} className='mt-5'>
							<Button as={NavLink} to={'/home'} onClick={ e => naviCookieCheck(e) } variant='success' size='lg'>
								시작하기
							</Button>
							<FileInputComponent setState={setReadFile}/>
						</Stack>
					</Col>
					<Col>
						<Image src='https://picsum.photos/600/400' rounded fluid></Image>
					</Col>
				</Row>
			</Container>
			<Footer />
		</>
	);
}

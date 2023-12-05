import Footer from '../component/Footer';
import Header from '../component/Header';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
// import '../constant/css/home.css';
import {
	_PageWrapper,
	_PageContainer,
	_Row,
	_LeftCol,
	_RightCol,
	_TitleStack,
	_ButtonStack,
	_Button,
	_Image,
	_Title,
	_Subtitle,
} from '../constant/css/styledComponents/__WelcomePage';

export default function WelcomePage() {
	const isMobile = useMediaQuery({
		query: '(max-width: 576px)',
	});

	const location = useLocation();
	const [message, setMessage] = useState(location.state?.message || '');
	console.log('message', message);

	//이건 확인해봐야 함
	const [visible, setIsVisible] = useState(message ? true : false);
	console.log('visible', visible);

	const { naviCookieCheck } = useDefaultCheck();
	const dispatch = useDispatch();

	const [readFile, setReadFile] = useState();
	const navi = useNavigate();

	useEffect(() => {
		if (readFile) {
			const data = JSON.parse(readFile);
			if (validateUnspecifiedPlannerData(data)) {
				dispatch(noEditPlannerAction.setPlansInit(data));
				navi('/plannerNoEdit', {
					state: {
						sourceData: data,
					},
				});
			} else {
				requestFail('플래너 불러오기', '데이터가 올바르지 않습니다');
			}
		}
	}, [readFile]);

	const readPlannerData = async (data, specified) => {
		const result = await readPlanner(data, specified);
		if (result) {
			const { plannerId } = result;
			dispatch(plannerListActions.addPlanner(result));
			dispatch(calendarActions.setAll([plannerId]));
		} else {
			requestFail('데이터');
		}
	};

	const handleNavigation = (e) => {
		if (naviCookieCheck(e)) {
			navi('/home');
		}
	};

	return (
		<_PageWrapper fluid>
			<_PageContainer>
				<_Row xs={1} lg={2}>
					<_LeftCol>
						<_TitleStack gap={3}>
							<_Title>Security-first diagramming for teams.</_Title>
							<_Subtitle>
								Bring your storage to our online tool, or save locally with the desktop app.
							</_Subtitle>
						</_TitleStack>
						<_ButtonStack direction={isMobile ? 'vertical' : 'horizontal'} gap={5}>
							<_Button onClick={(e) => handleNavigation(e)} variant='dark' size='lg'>
								시작하기
							</_Button>
							<FileInputComponent setState={setReadFile} />
						</_ButtonStack>
					</_LeftCol>
					<_RightCol>
						<_Image src='https://picsum.photos/600/400' rounded fluid></_Image>
					</_RightCol>
				</_Row>
			</_PageContainer>
		</_PageWrapper>
	);
}

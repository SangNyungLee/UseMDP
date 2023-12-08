import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useDefaultCheck from '../hook/useDefaultCheck';
import FileInputComponent from '../component/FileInputComponent';
import { requestFail } from '../component/etc/SweetModal';
import { validateSpecifiedPlannerData, validateUnspecifiedPlannerData } from '../utils/DataValidate';
import {
	_PageWrapper,
	_PageContainer,
	_Row,
	_StartButtonCol,
	_FileInputButtonCol,
	_ButtonRow,
	_LeftCol,
	_RightCol,
	_ButtonContainer,
	_Button,
	_Image,
	_Title,
	_Subtitle,
} from '../constant/css/styledComponents/__WelcomePage';
import { plannerCardStatusDevide } from '../utils/DataParsing';

export default function WelcomePage() {
	const { naviCookieCheck } = useDefaultCheck();

	const [readFile, setReadFile] = useState();
	const navi = useNavigate();

	useEffect(() => {
		if (readFile) {
			const data = JSON.parse(readFile);
			if (validateUnspecifiedPlannerData(data)) {
				navi('/plannerNoEdit', {
					state: {
						sourceData: data,
					},
				});
			} else if (validateSpecifiedPlannerData(data)){
				navi('/plannerNoEdit', {
					state: {
						sourceData: {
							...data,
							cards: data.cards.flat()
						},
					},
				});
			} else {
				requestFail('플래너 불러오기', '데이터가 올바르지 않습니다');
			}
			setReadFile();
		}
	}, [readFile]);

	const handleNavigation = (e) => {
		if (naviCookieCheck(e)) {
			navi('/home');
		}
	};

	return (
		<_PageWrapper fluid>
			<_PageContainer fluid>
				<_Row xs={1} md={2}>
					<_LeftCol>
						<_Title>칸반보드로 개발일정을 관리하고, 기록합니다.</_Title>
						<br />
						<_Subtitle>
							바로 시작, 혹은 이미 저장된 칸반보드 JSON 파일을 불러와서 작업할 수 있습니다.
						</_Subtitle>
						<_ButtonRow xs={2}>
							<_StartButtonCol>
								<_Button onClick={(e) => handleNavigation(e)} variant='dark'>
									시작하기
								</_Button>
							</_StartButtonCol>
							<_FileInputButtonCol>
								<FileInputComponent setState={setReadFile}>
									<_Button variant='dark'>불러오기</_Button>
								</FileInputComponent>
							</_FileInputButtonCol>
						</_ButtonRow>
					</_LeftCol>
					<_RightCol>
						<_Image src='/images/PlannerEdit.gif' rounded fluid />
					</_RightCol>
				</_Row>
			</_PageContainer>
		</_PageWrapper>
	);
}

// <_Row xs={1} lg={2}>
// 	<_LeftCol>
// 		<_TitleStack gap={3}>
// 			<_Title>Security-first diagramming for teams.</_Title>
// 			<_Subtitle>Bring your storage to our online tool, or save locally with the desktop app.</_Subtitle>
// 		</_TitleStack>
// 		<_ButtonStack
// 			direction={isMobile ? 'horizontal' : 'horizontal'}
// 			gap={5}
// 			className='justify-content-center justify-content-md-start'>
// 			<_Button onClick={(e) => handleNavigation(e)} size='lg'>
// 				시작하기
// 			</_Button>
// 			<FileInputComponent setState={setReadFile}>
// 				<_Button size='lg'>불러오기</_Button>
// 			</FileInputComponent>
// 		</_ButtonStack>
// 	</_LeftCol>
// 	<_RightCol>
// 		<_Image src='https://picsum.photos/600/400' rounded fluid></_Image>
// 	</_RightCol>
// </_Row>;

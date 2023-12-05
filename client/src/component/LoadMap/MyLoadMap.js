import styled from 'styled-components';
// import star from '../../constant/img/star.png';
// import yellowStar from '../../constant/img/yellowStar.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DataDownload from '../../utils/DataDownload';
import { calendarActions } from '../../store/calendar';
import { plannerListActions } from '../../store/plannerList';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from 'use-local-storage';
import { getPlannerBtoA, patchPlanner } from '../../utils/DataAxios';
import Swal from 'sweetalert2';

//Styled Components with React Bootstrap
import {
	_CardContainer,
	_CardHeader,
	_CardFooter,
	_CardImg,
	_CardImgOverlay,
	_CardBody,
	_CardTitle,
	_CardSubtitle,
	_CardText,
	_CardLink,
	_CardDownloadButton,
	_CardEditButton,
	_IconContainer,
	_LockedIcon,
	_UnlockedIcon,
	_DownloadIcon,
	_EditIcon,
} from '../../constant/css/styledComponents/__MyLoadMap';
import skyImg from '../../constant/img/sky.jpg';
import { requestFail } from '../etc/SweetModal';

export default function MyLoadMap(props) {
	const dispatch = useDispatch();
	console.log('MyLoadMap props.datas', props.datas);
	const state = useSelector((state) => state.plannerList);
	const { plannerId, title, creator, likePlanner, thumbnail, createdAt, updatedAt, plannerAccess, isDefault } =
		props.datas;
	// console.log(props);
	const navigate = useNavigate();
	const handleClick = async (e) => {
		e.stopPropagation();
		//모달이 꺼져있으면
		if (!showModal) {
			const btoaId = btoa(plannerId);
			const result = await getPlannerBtoA(btoaId);
			if (result.status === 200) {
				console.log('click', result.data);
				const cardList = result.data.data.cards;
				const cards = [[], [], []];
				for (let i = 0; i < cardList.length; i++) {
					if (cardList[i].cardStatus === 'TODO') {
						cards[0].push(cardList[i]);
					} else if (cardList[i].cardStatus === 'DOING') {
						cards[1].push(cardList[i]);
					} else if (cardList[i].cardStatus === 'DONE') {
						cards[2].push(cardList[i]);
					}
				}
				dispatch(calendarActions.setQuote([plannerId]));
				dispatch(plannerListActions.replaceCards({ id: plannerId, cards: cards }));

				navigate(`/planner?id=${btoaId}`);
			} else {
				requestFail('플래너 불러오기');
			}
		}
	};
	const [starClick, setStarClick] = useState(false);

	// 모달 보여주기
	const [showModal, setShowModal] = useState(false);

	// 모달폼
	const [editedTitle, setEditedTitle] = useState(title);
	const [editedPlannerAccess, setEditedPlannerAccess] = useState(plannerAccess);

	const handleShareIcon = (e) => {
		e.stopPropagation();
		//RightClicker 보내주자.
		DataDownload(editedTitle, {
			plannerId,
			creator,
			title: editedTitle,
			likePlanner,
			thumbnail,
			isDefault,
			createdAt,
			updatedAt,
			plannerAccess: editedPlannerAccess,
		});
	};

	const changeDataByButton = (e) => {
		e.stopPropagation();
		setShowModal(true);
	};
	//모달끄기
	const handleCloseModal = (e) => {
		e.stopPropagation();
		setShowModal(false);
		setEditedTitle(title);
		setEditedPlannerAccess(plannerAccess);
	};

	//저장
	const handleSaveChanges = async (e) => {
		e.stopPropagation();

		//업데이트하고, axios보내줘야한다.

		const plannerData = {
			plannerId,
			creator,
			title: editedTitle,
			likePlanner,
			thumbnail,
			isDefault,
			plannerAccess: editedPlannerAccess,
			taglist: [],
		};

		const result = await patchPlanner(plannerData);
		if (result.status === 200) {
			setShowModal(false);
		} else {
			requestFail('플래너 저장');
		}
	};
	//sweetAlert창
	const sweetModal = async (e) => {
		// SweetAlert을 이용하여 입력 폼을 보여줌
		e.stopPropagation();
		const result = await Swal.fire({
			title: '플래너 수정',
			html: `
      <input id="swal-input1" class="swal2-input" placeholder="제목" value="${editedTitle}">
    `,
			input: 'radio',
			inputOptions: {
				PUBLIC: 'Public',
				PRIVATE: 'Private',
			},
			inputValue: editedPlannerAccess,
			inputValidator: (value) => {
				if (!value) {
					return '공개범위를 선택하세요.';
				}
			},
			preConfirm: async () => {
				// 확인을 눌렀을 때의 로직
				const inputValue = document.getElementById('swal-input1').value;
				const radioValue = document.querySelector('input[name="swal2-radio"]:checked').value;
				console.log('inputValue', inputValue);
				// axios 요청을 보내고 모달을 닫음

				const plannerData = {
					plannerId,
					creator,
					title: inputValue,
					likePlanner,
					thumbnail,
					isDefault,
					plannerAccess: radioValue, // SweetAlert에서 선택한 값 사용
					taglist: [],
				};

				const axiosResult = await patchPlanner(plannerData);
				if (axiosResult.status !== 200) {
					requestFail('플래너 저장');
				}
				return { editedTitle: inputValue, editedPlannerAccess: radioValue };
			},
			confirmButtonText: '확인',
			showCancelButton: true,
		});

		if (result.isConfirmed) {
			// 값이 없을 경우 빈 문자열로 설정
			console.log('result', result);
			const { editedTitle, editedPlannerAccess } = result.value;
			setEditedTitle(editedTitle || '');
			setEditedPlannerAccess(editedPlannerAccess || '');
		}
	};

	const [isHovering, setIsHovering] = useState(false);

	return (
		<>
			{props.datas ? (
				<_CardContainer
					onClick={(e) => handleClick(e)}
					onMouseOver={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}>
					<_CardImg src={thumbnail ? thumbnail : skyImg} alt='planner thumbnail' />
					<_CardImgOverlay>
						<_CardBody>
							<_CardTitle as={'h5'}>{editedTitle}</_CardTitle>
							{isHovering ? (
								<>
									<_CardDownloadButton onClick={(e) => handleShareIcon(e)} size='sm' variant='none'>
										<_DownloadIcon />
									</_CardDownloadButton>
									<_CardEditButton onClick={(e) => sweetModal(e)} size='sm' variant='none'>
										<_EditIcon />
									</_CardEditButton>
								</>
							) : null}
							{editedPlannerAccess === 'PRIVATE' ? (
								<_IconContainer>
									<_LockedIcon />
								</_IconContainer>
							) : null}
						</_CardBody>
					</_CardImgOverlay>
				</_CardContainer>
			) : null}
		</>
	);
}

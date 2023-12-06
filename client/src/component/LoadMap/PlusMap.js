import styled from 'styled-components';
import { useState } from 'react';
import Swal from 'sweetalert2';
import base64Str from '../../constant/ImageBase64';
import {
	_CardContainer,
	_CardBody,
	_CardText,
	_PlusIcon,
	_PlusButton,
	_CardImgOverlay,
	_CardImg,
} from '../../constant/css/styledComponents/__PlusMap';

import { postPlanner } from '../../utils/DataAxios';
import { requestFail } from '../etc/SweetModal';
import { useDispatch } from 'react-redux';
import { plannerListActions } from '../../store/plannerList';

export default function PlusMap(props) {
	const [editedCreator, setEditedCreator] = useState('');
	const [editedTitle, setEditedTitle] = useState('');
	const [editedPlannerAccess, setEditedPlannerAccess] = useState('PUBLIC');
	
	const dispatch = useDispatch();

	const handleSaveChanges = async (titleInput, creatorInput, plannerAccessInput) => {

		const data = {
			creator: creatorInput,
			title: titleInput,
			thumbnail: base64Str,
			plannerAccess: plannerAccessInput,
		};

		try {
			const result = await postPlanner(data)
			if(result.status !== 201){
				requestFail("플래너 생성")
			}

			const newPlannerId = result.data.data;
			dispatch(plannerListActions.addPlanner({
				...data,
				plannerId: newPlannerId,
				cards: [[],[],[]],
				taglist: [{
					title: "DEFAULT",
					valuer: "DEFAULT",
					thumbnail: "/svg/css.svg"
				}]
			}))

			// SweetAlert을 이용하여 성공 메시지를 보여줌
			Swal.fire({
				icon: 'success',
				title: '플래너 생성 성공!',
				text: '플래너가 성공적으로 생성되었습니다.',
			});
		} catch (error) {
			// SweetAlert을 이용하여 에러 메시지를 보여줌
			Swal.fire({
				icon: 'error',
				title: '플래너 생성 실패',
				text: '플래너 생성 중에 오류가 발생했습니다.',
			});
		}
	};

	const handleClick = async (e) => {
		// SweetAlert을 이용하여 입력 폼을 보여줌
		e.stopPropagation();
		const result = await Swal.fire({
			title: '플래너 생성',
			html:
				'<input id="swal-input1" class="swal2-input" placeholder="제목">' +
				'<input id="swal-input2" class="swal2-input" placeholder="작성자">',
			input: 'radio',
			inputOptions: {
				PUBLIC: 'Public',
				PRIVATE: 'Private',
			},
			inputValidator: (value) => {
				if (!value) {
					return '공개범위를 선택하세요.';
				}
			},
			confirmButtonText: '확인',
			showCancelButton: true,
		});

		if (result.isConfirmed) {
			// 입력값을 가져와서 상태 업데이트
			const titleInput = Swal.getPopup().querySelector('#swal-input1').value;
			const creatorInput = Swal.getPopup().querySelector('#swal-input2').value;
			const plannerAccessInput = result.value;
			console.log('title', titleInput, creatorInput, plannerAccessInput);
			setEditedTitle(titleInput);
			setEditedCreator(creatorInput);
			setEditedPlannerAccess(plannerAccessInput);

			// 확인 버튼 클릭 시 플래너 생성 함수 호출
			handleSaveChanges(titleInput, creatorInput, plannerAccessInput);
		}
	};

	return (
		<_CardContainer text='white' className='text-center'>
			<_CardBody onClick={(e) => handleClick(e)}>
				<_CardText>Create new planner</_CardText>
			</_CardBody>
		</_CardContainer>
	);
}

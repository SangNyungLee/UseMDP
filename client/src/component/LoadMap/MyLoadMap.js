import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataDownload from '../../utils/DataDownload';
import { calendarActions } from '../../store/calendar';
import { plannerListActions } from '../../store/plannerList';
import { useDispatch, useSelector } from 'react-redux';
import { getPlannerBtoA, patchPlanner, deleteMyPlanner } from '../../utils/DataAxios';
import Swal from 'sweetalert2';

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
    _CardDeleteButton,
    _DeleteIcon,
} from '../../constant/css/styledComponents/__MyLoadMap';
import skyImg from '../../constant/img/sky.jpg';
import { requestFail } from '../etc/SweetModal';
import '../../constant/css/sweetAlert.css';
export default function MyLoadMap(props) {
    const dispatch = useDispatch();
    const { plannerId, title, creator, likePlanner, thumbnail, createdAt, updatedAt, plannerAccess, isDefault } = props.datas;
    const navigate = useNavigate();
    const handleClick = async (e) => {
        e.stopPropagation();
        const btoaId = btoa(plannerId);
        const result = await getPlannerBtoA(btoaId);
        if (result.status === 200) {
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
    };
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedPlannerAccess, setEditedPlannerAccess] = useState(plannerAccess);

    const handleShareIcon = (e) => {
        e.stopPropagation();
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

    const sweetModal = async (e) => {
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
                const inputValue = document.getElementById('swal-input1').value;
                const radioValue = document.querySelector('input[name="swal2-radio"]:checked').value;

                const plannerData = {
                    plannerId,
                    creator,
                    title: inputValue,
                    likePlanner,
                    thumbnail,
                    isDefault,
                    plannerAccess: radioValue,
                    taglist: [],
                };

                const axiosResult = await patchPlanner(plannerData);
                if (axiosResult.status !== 200) {
                    requestFail('플래너 저장');
                }
                return { editedTitle: inputValue, editedPlannerAccess: radioValue };
            },
            confirmButtonText: '확인',
            confirmButtonColor: 'black',
            cancelButtonText: '취소',
            showCancelButton: true,
        });

        if (result.isConfirmed) {
            const { editedTitle, editedPlannerAccess } = result.value;
            setEditedTitle(editedTitle || '');
            setEditedPlannerAccess(editedPlannerAccess || '');
        }
    };

    const [isHovering, setIsHovering] = useState(false);

    const deleteThisPlanner = async (e) => {
        e.stopPropagation();
        const result = await deleteMyPlanner(plannerId);
        if (result.status === 200) {
            dispatch(plannerListActions.delPlanner(plannerId));
        }
    };

    return (
        <_CardContainer id={'CardContainer'} onClick={(e) => handleClick(e)} onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <_CardImg src={thumbnail ? thumbnail : skyImg} alt="planner thumbnail" />
            <_CardImgOverlay>
                <_CardBody>
                    <_CardTitle as={'h5'}>{editedTitle}</_CardTitle>
                    {isHovering ? (
                        <>
                            <_CardDownloadButton onClick={(e) => handleShareIcon(e)} size="sm" variant="none">
                                <_DownloadIcon />
                            </_CardDownloadButton>
                            <_CardEditButton onClick={(e) => sweetModal(e)} size="sm" variant="none">
                                <_EditIcon />
                            </_CardEditButton>
                            <_CardDeleteButton onClick={(e) => deleteThisPlanner(e)} size="sm" variant="none">
                                <_DeleteIcon />
                            </_CardDeleteButton>
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
    );
}

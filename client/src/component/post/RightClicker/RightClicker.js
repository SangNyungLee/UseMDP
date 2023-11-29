import React from 'react';
import { ListGroup } from 'react-bootstrap';
import DataDownload from '../../../utils/DataDownload';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCopyPlanners, getPlannerBtoA, postCopyPlanners } from '../../../utils/DataAxios';
import { calendarActions } from '../../../store/calendar';
import { plannerListActions } from '../../../store/plannerList';
//props로 position을 줄것. 그럼 list그룹의 위치를 조절할 수 있다.
const RightClicker = (props) => {
    //실제 예제에서는 여러 방법으로 Ref를 가져와야함.
    //혹은 html을 줘야함.
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [plannerTitle, plannerId] = props.rightClickData;
    //일단 로컬에 저장.
    const saveState = async () => {
        const btoaId = btoa(plannerId);
        const result = await getPlannerBtoA(btoaId);
        // const result = await axios(`/plannerTest`);
        DataDownload(plannerTitle, result.data);
    };

    const toPlannerLink = async () => {
        const btoaId = btoa(plannerId);
        const result = await getPlannerBtoA(btoaId);
        const cardList = result.data.cards;
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
    };

    const toMyLoadMap = async () => {
        const btoaId = btoa(plannerId);
        const result = await postCopyPlanners(plannerId);
        console.log(result.data);
        // //이름을 받아서 지운다
        // const removeProperties = (obj, ...propsToRemove) => {
        //     const newObj = { ...obj };
        //     propsToRemove.forEach((prop) => delete newObj[prop]);
        //     return newObj;
        // };

        // const modifiedData = {
        //     ...removeProperties(inputData, 'plannerId'),
        //     cards: inputData.cards.map((card) => removeProperties(card, 'cardId')),
        // };
        // console.log(modifiedData);
    };

    return (
        <ListGroup style={{ position: 'fixed', zIndex: 99, top: props.point[0], left: props.point[1] }}>
            <ListGroup.Item className="bg-dark" onClick={toPlannerLink} style={{ color: 'white' }}>
                링크
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark" onClick={saveState} style={{ color: 'white' }}>
                다운로드
            </ListGroup.Item>
            <ListGroup.Item className="bg-dark" onClick={toMyLoadMap} style={{ color: 'white' }}>
                내로드맵으로
            </ListGroup.Item>
        </ListGroup>
    );
};

export default RightClicker;

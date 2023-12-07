import React from 'react';
import { ListGroup } from 'react-bootstrap';
import DataDownload from '../../../utils/DataDownload';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPlannerBtoA, postCopyPlanners } from '../../../utils/DataAxios';
import { calendarActions } from '../../../store/calendar';
import { plannerListActions } from '../../../store/plannerList';
import { requestFail } from '../../etc/SweetModal';
import { plannerCardStatusDevide } from '../../../utils/DataParsing';

const RightClicker = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const setPoint = props.setPoint;
    const [plannerTitle, plannerId] = props.rightClickData;
    const saveState = async (e) => {
        e.stopPropagation();
        const btoaId = btoa(plannerId);
        const result = await getPlannerBtoA(btoaId);
        if (result.status === 200) {
            DataDownload(plannerTitle, result.data.data);
        } else {
            requestFail('데이터 다운로드');
            return;
        }
        setPoint([-1, -1]);
    };

    const toPlannerLink = async (e) => {
        e.stopPropagation();
        const btoaId = btoa(plannerId);
        navigate(`/plannerNoEdit?id=${btoaId}`);

        setPoint([-1, -1]);
    };

    const toMyLoadMap = async (e) => {
        e.stopPropagation();
        const result1 = await postCopyPlanners(plannerId);
        if (result1.status !== 201) {
            requestFail('플래너 복사');
            return;
        }

        const btoaId = btoa(result1.data.data);

        const result2 = await getPlannerBtoA(btoaId);
        if (result2.status !== 200) {
            requestFail('복사된 플래너 불러오기');
            return;
        }

        const planner = plannerCardStatusDevide(result2.data.data);
        dispatch(plannerListActions.addPlanner(planner));
        setPoint([-1, -1]);
    };

    return (
        <ListGroup style={{ position: 'fixed', zIndex: 99, top: props.point[0], left: props.point[1] }}>
            <ListGroup.Item onClick={(e) => toPlannerLink(e)} style={{ backgroundColor: '#EEEEEE', color: '#222831', cursor: 'pointer' }}>
                링크
            </ListGroup.Item>
            <ListGroup.Item onClick={(e) => saveState(e)} style={{ backgroundColor: '#EEEEEE', color: '#222831', cursor: 'pointer' }}>
                다운로드
            </ListGroup.Item>
            <ListGroup.Item onClick={(e) => toMyLoadMap(e)} style={{ backgroundColor: '#EEEEEE', color: '#222831', cursor: 'pointer' }}>
                내로드맵으로
            </ListGroup.Item>
        </ListGroup>
    );
};

export default RightClicker;

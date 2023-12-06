import { useEffect, useState } from 'react';
import MDPModal from '../modal/MDPModal';
import { useDispatch } from 'react-redux';
import { plannerListActions } from '../../store/plannerList';

import CustomHeader2 from './CustomHeader2';
import { patchPlanner } from '../../utils/DataAxios';
import { requestFail } from '../etc/SweetModal';

export default function QuoteHeader(props) {
    const { selectedCard, visible, setVisible, plannerList, plannerInfo, setSwitch } = props;
    const [plannerId, setPlannerId] = useState();
    const [readThumbnail, setReadThumbnail] = useState();

    const dispatch = useDispatch();

    const patchPlannerAndDispatch = async (thumbnail) => {
        const data = { ...plannerInfo, thumbnail: thumbnail };
        const res = await patchPlanner(data);
        if (res.status !== 200) {
            requestFail('플래너 상태 저장');
        }
        dispatch(
            plannerListActions.updatePlannerThumbnail({
                plannerId,
                thumbnail,
            })
        );
    };

    useEffect(() => {
        if (plannerInfo) {
            const { plannerId } = plannerInfo;
            setPlannerId(plannerId);
        }
    }, [plannerInfo]);

    useEffect(() => {
        if (readThumbnail) {
            patchPlannerAndDispatch(readThumbnail);
            setReadThumbnail();
        }
    }, [readThumbnail]);

    return (
        <>
            <CustomHeader2 setSwitch={setSwitch} plannerInfo={plannerInfo} plannerList={plannerList} />
            <MDPModal selectedCard={selectedCard} modalStatus={visible} plannerId={plannerId} modalClose={() => setVisible(false)} />
        </>
    );
}

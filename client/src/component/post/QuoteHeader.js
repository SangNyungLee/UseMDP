import { useEffect, useState } from 'react';
import DataDownload from '../../utils/DataDownload';
import MDPModal from '../modal/MDPModal';
import DataReaderModal from '../reader/DataReaderModal';
import ThumbnailMaker from './RightClicker/ThumbnailMaker';
import { useDispatch } from 'react-redux';
import { plannerListActions } from '../../store/plannerList';

export default function QuoteHeader(props) {
    const { selectedCard, thumnnailRef, visible, setVisible, plannerList, plannerId, title } = props;

    const [plannerTitle, setPlannerTitle] = useState(title);
    const [readData, setReadData] = useState();

    const dispatch = useDispatch();

    function handleThumbnailDownload() {
        console.log('download', thumnnailRef.current);
        ThumbnailMaker(thumnnailRef);
    }

    const saveState = (e) => {
        e.stopPropagation()
        DataDownload(plannerTitle, plannerList);
    };

    const handleBlur = (e) => {
        dispatch(
            plannerListActions.updatePlannerTitle({
                plannerId,
                title: plannerTitle,
            })
        );
    };

    useEffect(() => {
        if (readData) {
            console.log('readData', readData);
        }
    }, [readData]);

    return (
        <>
            <MDPModal selectedCard={selectedCard} modalStatus={visible} plannerId={plannerId} modalClose={() => setVisible(false)} />
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    handleThumbnailDownload();
                }}
            >
                ThumbnailMaker
            </button>
            <input value={plannerTitle} onChange={(e) => setPlannerTitle(e.target.value)} onBlur={handleBlur} />
            <button type="button" onClick={ e => saveState(e)}>
                저장하기
            </button>
            <DataReaderModal setState={setReadData} />
        </>
    );
}

import { useState } from 'react';
import RightClicker from '../../post/RightClicker/RightClicker';
import { useSelector } from 'react-redux';
import { _Container, _Row, _Col } from '../../../constant/css/styledComponents/__CustomListHiddable';
import { Fade } from 'react-awesome-reveal';

export default function CustomListHiddable(props) {
    const [rightClickData, setRightClickData] = useState([]);

    const CustomLoadMap = props.loadMap;

    const like = useSelector((state) => state.like);

    const data = props.datas;

    const [point, setPoint] = props.points;

    const handleRightClick = (e, newTitle, newId) => {
        e.preventDefault();
        setRightClickData([newTitle, newId]);
        setPoint([e.clientY, e.clientX]);
    };

    return (
        <>
            {point[0] !== -1 && point[1] !== -1 ? <RightClicker rightClickData={rightClickData} point={point} setPoint={setPoint}></RightClicker> : null}

            <_Container $fluid>
                <Fade direction={'up'} duration={500} cascade triggerOnce>
                    <_Row xxs={2} xs={2} sm={2} md={2} lg={3} xl={4} xxl={4}>
                        {data.map(planner => {
                            return (
                                <_Col key={planner.title}>
                                    <div onContextMenu={(e) => handleRightClick(e, planner.title, planner.plannerId)}>
                                        <CustomLoadMap datas={planner} isLike={like} />
                                    </div>
                                </_Col>
                            );
                        })}
                    </_Row>
                </Fade>
            </_Container>
        </>
    );
}

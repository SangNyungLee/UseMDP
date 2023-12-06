import PlusMap from '../../LoadMap/PlusMap';
import LoadMap from '../../LoadMap/LoadMap';
import MyLoadMap from '../../LoadMap/MyLoadMap';
import { Fade, Bounce, Flip, Hinge, JackInTheBox, Roll, Rotate, Slide, Zoom, AttentionSeeker } from 'react-awesome-reveal';
import { _Row, _Col, _Container } from '../../../constant/css/styledComponents/_SearchCustomList';

export default function SearchCustomList(props) {
    const data = props.datas;

    const CustomLoadMap = props.loadMap;
    return (
        <>
            <_Container $fluid>
                <Fade direction={'up'} duration={500} cascade triggerOnce>
                    <_Row xxs={1} xs={2} sm={2} md={2} lg={3} xl={4} xxl={4}>
                        {data.map((planner, idx) => {
                            return (
                                <_Col key={idx + 1}>
                                    <CustomLoadMap datas={planner} />
                                </_Col>
                            );
                        })}
                    </_Row>
                </Fade>
            </_Container>
        </>
    );
}

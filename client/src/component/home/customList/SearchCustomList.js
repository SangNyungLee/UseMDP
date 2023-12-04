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
            <_Container fluid>
                <Fade direction={'up'} duration={500} cascade triggerOnce>
                    <_Row xs={6} sm={6} md={12} lg={12} xl={12} xxl={12}>
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

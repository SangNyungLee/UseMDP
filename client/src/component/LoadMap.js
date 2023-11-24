import { Container, Image, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { planActions } from '../store/planner';
import { planInfoActions } from '../store/plannerInfo';
const getItems = (count, offset = 0, separatorStr = 'TODO') =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        cardId: `item-${k + offset}-${new Date().getTime()}-${separatorStr}`,
        post: ``,
        title: `title ${k + offset}`,
        coverColor: '#FFD6DA',
        startDate: new Date(2023, 0, 1).toISOString(),
        endDate: new Date(2023, 0, 1).toISOString(),
        todolist: [{ done: false }, { jpa: false }],
        intOrder: offset,
        separatorPlan: separatorStr,
        sourceResource: null,
    }));

export default function LoadMap(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { plannerId, title, creator, likePlanner, thumbnail, createAt, description } = props.datas;
    // console.log(thumbnail);
    const handleClick = async () => {
        const btoaId = btoa(plannerId);
        // Initialize an array with three empty subarrays

        try {
            navigate(`/planner?id=${btoaId}`);
        } catch (e) {
            console.log(e);
            dispatch(planActions.setPlansInit([getItems(8), getItems(5, 8), getItems(5, 13)]));
            dispatch(planInfoActions.setPlanInfoInit([]));
            navigate('/planner');
        }
    };
    return (
        <Card onClick={handleClick} style={{ width: '250px' }}>
            <Card.Img variant="top" src={thumbnail}></Card.Img>
            <Card.Body>
                <Card.Title style={{ fontSize: '14px', fontWeight: 'bold' }}>{title}</Card.Title>
                <Card.Subtitle style={{ fontSize: '12px' }} className="mb-2 text-muted float-end">
                    {creator}
                </Card.Subtitle>
                <br />
                <Card.Text style={{ fontSize: '13px' }}>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

{
    /* 
<Image className="w-50" src={thumbnail}></Image>
            <Row>
                <Col>
                    <h3>{title}</h3>
                    <span>{description}</span>
                </Col>
                <Col>{creator}</Col>
            </Row>
        </> */
}

import { Container, Image, Row, Col, Card, Button } from 'react-bootstrap';

export default function LoadMap(props) {
    const { plannerId, title, creator, likePlanner, thumbnail, createAt, description } = props.datas;
    // console.log(thumbnail);

    return (
        <Card style={{ width: '250px', height: '125px' }}>
            <Card.Img src={thumbnail}></Card.Img>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{creator}</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

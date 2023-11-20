import { Container, Image, Row, Col, Card, Button } from 'react-bootstrap';

export default function LoadMap(props) {
    const { plannerId, title, creator, likePlanner, thumbnail, createAt, description } = props.datas;
    console.log(props);

    return (
        <>
            <Image className="w-50" src={thumbnail}></Image>
            <Row>
                <Col>
                    <h3>{title}</h3>
                    <span>{description}</span>
                </Col>
                <Col>{creator}</Col>
            </Row>
        </>
    );
}

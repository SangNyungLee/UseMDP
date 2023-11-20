import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import base64Str from '../constant/ImageBase64';
import LoadMap from './LoadMap';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
export default function DefaultComponent() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            try {
                const result = await axios.get('/planner/trending');
                setData(result.data);
            } catch {
                console.log('error');
                setData([
                    { plannerId: 1, creator: '123', title: '230303', likePlanner: 1, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                    { plannerId: 2, creator: '234', title: '230304', likePlanner: 2, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                    { plannerId: 3, creator: '456', title: '230305', likePlanner: 3, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },

                    { plannerId: 1, creator: '123', title: '230303', likePlanner: 1, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                    { plannerId: 2, creator: '234', title: '230304', likePlanner: 2, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                    { plannerId: 3, creator: '456', title: '230305', likePlanner: 3, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                ]);
            }
        }
        getData();
    }, []);
    console.log(data);
    if (data.length == 0) {
        return (
            //Spinner
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    } else {
        return (
            <div>
                <h2>기본로드맵</h2>
                <Container>
                    <Row style={{ marginTop: '30px' }}>
                        <Col>
                            <div key={data[0].plannerId}>
                                <LoadMap datas={data[0]}></LoadMap>
                            </div>
                        </Col>
                        <Col>
                            <div key={data[1].plannerId}>
                                <LoadMap datas={data[1]}></LoadMap>
                            </div>
                        </Col>
                        <Col>
                            <div key={data[2].plannerId}>
                                <LoadMap datas={data[2]}></LoadMap>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '30px' }}>
                        <Col>
                            <div key={data[3].plannerId}>
                                <LoadMap datas={data[3]}></LoadMap>
                            </div>
                        </Col>
                        <Col>
                            <div key={data[4].plannerId}>
                                <LoadMap datas={data[4]}></LoadMap>
                            </div>
                        </Col>
                        <Col>
                            <div key={data[5].plannerId}>
                                <LoadMap datas={data[5]}></LoadMap>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

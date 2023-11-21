import { useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { planActions } from '../../store/planner';
import LoadMap from '../LoadMap';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import RightClicker from '../post/RightClicker/RightClicker';

export default function HomeComponent() {
    //이미 저장된 값이 있으면 그 list를 불러온다.
    const [data, setData] = useLocalStorage('List', '');

    const dispatch = useDispatch();

    // console.log(data);
    useEffect(() => {
        async function fetchData() {
            // const response = await axios.get('/api/myplanner');
            const response = await axios.get('/plannerTest');
            // console.log('res : ', response.data);
            setData(response.data);
            dispatch(planActions.setPlans(response.data));
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2 style={{ marginTop: '50px' }}>내 로드맵</h2>
            {data
                ? data.map((_, idx) => {
                      // 컨테이너를 만든다.
                      if (idx == 0) {
                          return (
                              <Container key={idx} style={{ marginTop: '30px' }}>
                                  <Row>
                                      {Array.from({ length: Math.min(4, data.length) }).map((_, i) => (
                                          <Col key={data[i].plannerId}>
                                              <div>
                                                  <LoadMap datas={data[i]}></LoadMap>
                                              </div>
                                          </Col>
                                      ))}
                                  </Row>
                              </Container>
                          );
                      } else if (idx % 4 == 0) {
                          const endIdx = Math.min(idx + 3, data.length - 1);
                          return (
                              <Container style={{ marginTop: '30px' }}>
                                  <Row>
                                      {Array.from({ length: endIdx - idx + 1 }).map((_, i) => (
                                          <Col key={data[idx + i].plannerId}>
                                              <div>
                                                  <LoadMap datas={data[idx + i]}></LoadMap>
                                              </div>
                                          </Col>
                                      ))}
                                      {/* 4개를 채워서 칸을 채우는것
                        그냥 Grid쓸껄 ㅇㅁㄻㄴㅇㄹㄴㅁㅇㄹ */}
                                      {Array.from({ length: 4 - (endIdx - idx + 1) }).map((_, i) => (
                                          <Col key={`empty-${i}`}></Col>
                                      ))}
                                  </Row>
                              </Container>
                          );
                      } else {
                          return null;
                      }
                  })
                : null}
        </div>
    );
}

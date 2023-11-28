//여기에서는 props로 파일 리스트를 받아 파일을 4x2로 출력하는 component를 만들고, 다른 컴포넌트에 주고 싶다.
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';

import PlusMap from '../LoadMap2/PlusMap';
export default function CustomList(props) {
    const data = props.datas;
    const CustomLoadMap = props.loadMap;
    const dataLength = data.length;

    return (
        <div>
            <PlusMap></PlusMap>
            {data
                ? data.map((_, idx) => {
                      // 컨테이너를 만든다.
                      if (idx === 0) {
                          return (
                              <Container key={idx} style={{ marginTop: '30px' }}>
                                  <Row>
                                      {Array.from({ length: Math.min(4, data.length) }).map((_, i) => (
                                          <Col key={data[i].plannerId}>
                                              <div>
                                                  <CustomLoadMap datas={data[i]}></CustomLoadMap>
                                              </div>
                                          </Col>
                                      ))}
                                      {Array.from({ length: 4 - data.length }).map((_, i) => (
                                          <Col key={`empty-${i}`}></Col>
                                      ))}
                                  </Row>
                              </Container>
                          );
                      } else if (idx % 4 === 0) {
                          const endIdx = Math.min(idx + 3, data.length - 1);
                          return (
                              <Container style={{ marginTop: '30px' }}>
                                  <Row>
                                      {Array.from({ length: endIdx - idx + 1 }).map((_, i) => (
                                          <Col key={data[idx + i].plannerId}>
                                              <div>
                                                  <CustomLoadMap datas={data[idx + i]}></CustomLoadMap>
                                              </div>
                                          </Col>
                                      ))}

                                      {Array.from({ length: 4 - (endIdx - idx + 1) }).map((_, i) =>
                                          i == 0 ? (
                                              <Col key={`empty-${i}`}>
                                                  <PlusMap></PlusMap>
                                              </Col>
                                          ) : (
                                              <Col key={`empty-${i}`}></Col>
                                          )
                                      )}
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

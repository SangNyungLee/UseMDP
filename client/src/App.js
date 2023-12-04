import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./constant/css/index.css";
import styled from "styled-components";
import RealHeader from "./component/RealHeader";
import "./constant/css/font.css";
const _Font = styled.div`
  font-family: "Pretendard-Regular";
`;

function App() {
  return (
    <_Font>
      <RealHeader />
      <Outlet />
    </_Font>
  );
}

export default App;

import QuoteApp from "../component/post/QuoteApp";
import "../constant/css/index.css";
import styled from "styled-components";

const _Font = styled.div`
  font-family: "SUITE-Regular";
`;

export default function PlannerPage() {
  return (
    <_Font>
      <QuoteApp />
    </_Font>
  );
}

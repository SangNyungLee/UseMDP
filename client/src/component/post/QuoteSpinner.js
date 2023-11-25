import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const _SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`

export default function QuoteSpinner(){
    return (
        <_SpinnerContainer>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </_SpinnerContainer>
    );
}
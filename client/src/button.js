import MyButton from 'react-bootstrap/Button';
import { Badge } from 'react-bootstrap';
import styled from 'styled-components';

const Button2 = styled.button.attrs({
    className: 'btn btn-primary',
})`
    background-color: purple;
    color: white;
`;

export default function NewButton() {
    return (
        <div>
            <MyButton>HI</MyButton>
            <button>HI2</button>
            <div>
                <h1>
                    Example heading
                    <Badge bg="secondary" as={MyButton}>
                        New
                    </Badge>
                </h1>
            </div>
            <Button2>HI3</Button2>
        </div>
    );
}

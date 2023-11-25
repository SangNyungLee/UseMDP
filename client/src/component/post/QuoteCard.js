import styled from 'styled-components';

const _CardHeader = styled.div`
    position: relative;
    background-color: ${(props) => props.covercolor};
    height: 20px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`;

const _CardBody = styled.div`
    padding-top: 8px;
    display: flex;
    justify-content: space-around;
`;

export default function QuoteCard({ card, deleteCard }) {
    return (
        <>
            <_CardHeader covercolor={card.coverColor} />
            <_CardBody>
                {card.title}
                <button type="button" onClick={(e) => deleteCard(e)}>
                    delete
                </button>
            </_CardBody>
        </>
    );
}

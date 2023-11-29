import styled from 'styled-components';
import trash from '../../constant/img/trash.svg';
const _CardHeader = styled.div`
    position: relative;
    background-color: ${(props) => props.color}; // lowercase를 쓰래서 color로 수정
    height: 20px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`;

const _CardBody = styled.div`
    padding-top: 8px;
    display: flex;
    justify-content: space-around;
`;

const CardParagraph = styled.p`
    margin: 0;

    &:not(:last-child) {
        margin-bottom: 1.5em;
    }
`;

const DelDiv = styled.div`
    &:hover {
        cursor: pointer;
    }
`;

export default function QuoteCard({ card, deleteCard, cardIndex }) {
    return (
        <>
            <_CardHeader color={card.coverColor} />
            <_CardBody>
                {card.title}
                <DelDiv>
                    <img onClick={(e) => deleteCard(e, cardIndex, card)} src={trash} alt="trashicon" />
                </DelDiv>
            </_CardBody>
        </>
    );
}

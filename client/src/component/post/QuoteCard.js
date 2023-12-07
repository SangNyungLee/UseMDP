import styled from 'styled-components';
import trash from '../../constant/img/trash.svg';

const _CardHeader = styled.div`
    position: relative;
    background-color: ${(props) => props.color};
    height: 20px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
`;

const _CardBody = styled.div`
    padding-top: 8px;
    display: flex;
    position: relative;
`;

const DelDiv = styled.div`
    position: absolute;
    right: 20px;
    z-index: 99;
    &:hover {
        cursor: pointer;
        background-color: #ccc;
    }
`;
const _TitleDiv = styled.div`
    margin-left: 20px;
    max-width: 100px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export default function QuoteCard({ card, deleteCard, cardIndex }) {
    return (
        <>
            <_CardHeader color={card.coverColor} />
            <_CardBody>
                <_TitleDiv>{card.title}</_TitleDiv>
                <DelDiv onClick={(e) => deleteCard(e, cardIndex, card)}>
                    <img style={{ margin: '3px' }} src={trash} alt="trashicon" />
                </DelDiv>
            </_CardBody>
        </>
    );
}

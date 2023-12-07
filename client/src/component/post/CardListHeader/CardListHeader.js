import styled from 'styled-components';
import menuicon from '../../../constant/img/menu.svg';
import { useDispatch, useSelector } from 'react-redux';
import { calendarActions } from '../../../store/calendar';
import { FaWandMagic } from 'react-icons/fa6';
const HeaderDiv = styled.div`
    text-align: left;
    margin: 10px;
    font-weight: 700;
`;
const MenuImg = styled.img`
    height: 20px;
    margin: 10px;
    &:hover {
        cursor: pointer;
    }
`;

const MenuWand = styled(FaWandMagic)`
    height: 20px;
    margin: 10px;
    &:hover {
        cursor: pointer;
    }
`;
const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: center;
`;

export default function CardListHeader(props) {
    const { index, pid } = props;

    const dispatch = useDispatch();
    const handleLeftClicker = (e) => {
        e.stopPropagation();
        // dispatch(pointActions.setPoint([e.clientY, e.clientX]));
        dispatch(calendarActions.setQuote([pid, index]));
    };

    switch (index) {
        case '0':
            return (
                <>
                    <FlexContainer>
                        <HeaderDiv>TODO</HeaderDiv>
                        <MenuWand onClick={(e) => handleLeftClicker(e)} />
                        {/* <MenuImg src={menuicon} onClick={(e) => handleLeftClicker(e)}></MenuImg> */}
                    </FlexContainer>
                </>
            );
        case '1':
            return (
                <FlexContainer>
                    <HeaderDiv>DOING</HeaderDiv>
                    <MenuWand onClick={(e) => handleLeftClicker(e)} />
                </FlexContainer>
            );
        case '2':
            return (
                <FlexContainer>
                    <HeaderDiv>DONE</HeaderDiv>
                    <MenuWand onClick={(e) => handleLeftClicker(e)} />
                </FlexContainer>
            );
        default:
            return (
                <FlexContainer>
                    <HeaderDiv>TODO</HeaderDiv>
                    <MenuWand src={menuicon}></MenuWand>
                </FlexContainer>
            );
    }
}

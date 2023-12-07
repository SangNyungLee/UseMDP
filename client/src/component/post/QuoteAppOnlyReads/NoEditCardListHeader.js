import styled from 'styled-components';
import menuicon from '../../../constant/img/menu.svg';

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
const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: center;
`;

export default function NoEditCardListHeader(props) {
    const { index } = props;

    switch (index) {
        case '0':
            return (
                <>
                    <FlexContainer>
                        <HeaderDiv>TODO</HeaderDiv>
                        <MenuImg src={menuicon}></MenuImg>
                    </FlexContainer>
                </>
            );
        case '1':
            return (
                <FlexContainer>
                    <HeaderDiv>DOING</HeaderDiv>
                    <MenuImg src={menuicon}></MenuImg>
                </FlexContainer>
            );
        case '2':
            return (
                <FlexContainer>
                    <HeaderDiv>DONE</HeaderDiv>
                    <MenuImg src={menuicon}></MenuImg>
                </FlexContainer>
            );
        default:
            return (
                <FlexContainer>
                    <HeaderDiv>TODO</HeaderDiv>
                    <MenuImg src={menuicon}></MenuImg>
                </FlexContainer>
            );
    }
}

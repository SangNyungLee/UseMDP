import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import ThumbnailMaker from './ThumbnailMaker';
const RightClicked = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
`;
const StyledLink = styled(Link)`
    text-decoration-line: none;
    color: black;
`;

//
export default function RightClickMenu() {
    const thumnnailRef = useRef(null);
    //지금은 썸네일을 다운로드하는 로직을 만들어둘것임. 필요할 듯함.
    function handleThumbnailDownload(e) {
        e.stopPropagation()
        ThumbnailMaker(thumnnailRef);
    }
    return (
        <RightClicked ref={thumnnailRef}>
            <li>
                <StyledLink>Link</StyledLink>
            </li>
            <li onClick={ e => handleThumbnailDownload(e)}>DownLoad</li>
        </RightClicked>
    );
}

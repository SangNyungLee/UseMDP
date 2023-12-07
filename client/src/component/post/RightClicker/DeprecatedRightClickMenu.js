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

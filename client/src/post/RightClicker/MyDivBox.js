import styled from 'styled-components';
import React, { useState } from 'react';
import CustomListGroup from './CustomListGroup';
const DivBox = styled.div`
    width: 300px;
    height: 300px;
    background-color: azure;
    position: relative;
`;

export default function MyDivBox() {
    const [point, setPoint] = useState([-1, -1]);
    const handleRightClick = (e) => {
        e.preventDefault();
        setPoint([e.nativeEvent.offsetY, e.nativeEvent.offsetX]);
    };
    return (
        <>
            {point[0] !== -1 && point[1] !== -1 ? <CustomListGroup point={point}></CustomListGroup> : null}
            <DivBox onContextMenu={handleRightClick}></DivBox>
        </>
    );
}

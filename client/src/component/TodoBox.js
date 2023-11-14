import styled, { css } from "styled-components";
import useComponentMove from "../hook/useComponenetMove"
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const _Container = styled.div`
    width:100px;
    height:60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`

const _MoveHandeler = styled.div`
  width: 80%;
  height: 8px;
  background-color: red;
`

export default function TodoBox({ id, type, children }){
    const targetRegister = useComponentMove(id,type);
    const moveTargetId = useSelector( state => state.move.target)

    const handleHover = (e) => {
        console.log("e",e);
        if(moveTargetId != null){
        }
    };

    return(<>
        <_MoveHandeler />
        <_Container>
            <div {...targetRegister}>
                {children}
            </div>
        </_Container>
        <_MoveHandeler/>
    </>)
}
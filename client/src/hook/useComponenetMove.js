import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { moveAction } from "../store/move";

export default function useComponentMove(targetId,targetType){
    const [ isMove, setIsMove ] = useState(false);
    const [ targetLeft, setTargetLeft ] = useState();
    const [ targetTop, setTargetTop ] = useState();
    const [ startX, setStartX ] = useState();
    const [ startY, setStartY ] = useState();
    const targetRef = useRef();
    const [ windowSize, setWindowSize ] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const dispatch = useDispatch();


    useEffect(()=>{
        window.addEventListener('resize',handleResize);
        return () => {
            window.removeEventListener('resize',handleResize);
        }
    },[])
    
    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(()=>{
        if(targetRef){
            const rect = targetRef.current.getBoundingClientRect();
            const { left } = rect
            setTargetLeft(left);
        }
    },[windowSize])

    useEffect(()=>{
        if(isMove){
            window.addEventListener("mousemove", handleWindowMouseMove)
            window.addEventListener("mouseup",(e)=>{
                setIsMove(false);
                setStartX(null);
                setStartY(null);
                window.removeEventListener("mousemove",handleWindowMouseMove)
            })
        }
    },[isMove])


    const targetRefSet = (ref) => {
        if(ref && !(targetRef.current)){
            targetRef.current = ref;
            const rect = ref.getBoundingClientRect();
            const { left, top } = rect
            setTargetLeft(left);
            setTargetTop(top);
        }
    }

    const targetMoveTrue = (e) => {
        e.preventDefault();
        setIsMove(true);
        setStartX(e.clientX);
        setStartY(e.clientY);
        dispatch(moveAction.setTarget(targetId));
        targetRef.current.style.position = 'absolute';
    }

    const handleWindowMouseMove = (e) => {
        if(isMove && startX && startY ){
            const gapX = startX - e.clientX;
            const gapY = startY - e.clientY;
            const newLeft = targetLeft - gapX
            const newTop = targetTop - gapY
            setTargetLeft(newLeft)
            setTargetTop(newTop)
            targetRef.current.style.left = newLeft + 'px'
            targetRef.current.style.top = newTop + 'px'
        }
    }

    const moveRegister = {
        ref: targetRefSet,
        onMouseDown: targetMoveTrue,
    }

    return moveRegister
}
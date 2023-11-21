import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const _Modal = styled.div`
    position: fixed;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    transition: left 0.5s; /* left 속성에 애니메이션 적용 */
    
    .modal-content {
        background-color: aliceblue;
        height: 100%;
        padding: 20px;
        border-radius: 5px;
    }
`

const _Button = styled.button`
    position: absolute;
    top: 0px;
`

export default function MainSideBar(){
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ modalWidth, setModalWidth ] = useState();
    const modalRef = useRef();
    const buttonRef = useRef();

    // const [ windowSize, setWindowSize ] = useState({
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    // });

    // const handleResize = () => {
    //     setWindowSize({
    //         width: window.innerWidth,
    //         height: window.innerHeight,
    //     });
    // };

    // useEffect(()=>{
    //     window.addEventListener('resize',handleResize);
    //     return () => {
    //         window.removeEventListener('resize',handleResize);
    //     }
    // },[])

    useEffect(()=>{
        if( modalRef ){
            const ref = modalRef.current;
            const rect = ref.getBoundingClientRect();
            const { width } = rect
            modalRef.current.style.left = '-' + width + 'px';
            buttonRef.current.style.left = width + 'px';
            setModalWidth(width);
        }
    },[])

    const toggleModal = () => {
        if(modalRef){
            if(isModalOpen){
                const left = '-' + modalWidth + 'px';
                modalRef.current.style.left = left;
                buttonRef.current.style.left = modalWidth + 'px';
                setIsModalOpen(false);
            } else {
                modalRef.current.style.left = '0px'
                buttonRef.current.style.left = modalWidth + 'px';
                setIsModalOpen(true);
            }
        }
    };

    return (
        <_Modal ref={modalRef}>
            <_Button ref={buttonRef} onClick={toggleModal}>모달 열기</_Button>
            <div className="modal-content">
                <h2>모달 내용</h2>
            </div>
        </_Modal>
    )
}
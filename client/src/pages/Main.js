import { useState } from "react";
import styled from "styled-components";
import DataDownload from "../utils/DataDownload";
import DataReader from "../component/DataReader";
import { useForm } from "react-hook-form";
import useComponentCompress from "../hook/useComponentCompress";
import ImageConvert from "../component/ImageConvert";
import useComponentMove from "../hook/useComponenetMove";
import ComponenetMoveEx from "../component/ComponetMoveEx";

const _Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  
  .modal-content {
        margin: 0px auto;
        background: white;
        width: 80%;
        height: 100%;
        padding: 20px;
        border-radius: 5px;
    }
`

export default function Main(){
    const { register, handleSubmit }= useForm();
    const [ data, setData ] = useState(null);
    const [ readerVisble, setReaderVisible ] = useState();

    const onSubmit = (e) => {
        const { name, age } = e
        const data = { name, age }
        DataDownload(data);
    }

    
    const readerToggle = (e) => {
        e.stopPropagation()
        setReaderVisible(prev => !prev);
    }

    const dataCheck = (e) => {
        e.stopPropagation()
        console.log(data);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = (e) => {
        e.stopPropagation()
        setIsModalOpen(true);
    };
  
    const closeModal = (e) => {
        e.stopPropagation()
        setIsModalOpen(false);
    };

    const { componentCompress, componentDecompress } = useComponentCompress();

    const componentSaveCheck = (e) => {
        e.stopPropagation()
        console.log("origin",<DataReader setState={setData}/>);
        const compressstring = componentCompress(<DataReader setState={setData}/>)
        console.log("compress",compressstring);
        const decomponent = componentDecompress(compressstring);
        console.log("decompress",decomponent);
        setDataArr(prev => [...prev,decomponent])
    }

    const [ dataArr, setDataArr ] = useState([]);

    const moveRegister = useComponentMove();

    return(
        <>
            <h1>메인 페이지</h1>
            <ComponenetMoveEx {...moveRegister}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder='이름을 입력해주세요' {...register('name')}/><br/>
                <input type="text" placeholder='나이를 입력해주세요' {...register('age')}/><br/>
                <button type="submit">다운로드</button>
            </form>
            <br/>
            <button onClick={ e => readerToggle(e) }>데이터 리더기 열기</button><br/>
            { readerVisble && <DataReader setState={setData}/>}
            <br/>
            <button onClick={ e => dataCheck(e) }>데이터 확인</button><br/>
            <br/>
            <button onClick={ e => openModal(e) }>모달 열기</button><br/>
            <br/>
            { isModalOpen && <_Modal>
                <div className="modal-content">
                    <h2>모달 내용</h2>
                    <button onClick={ e => closeModal(e) }>모달 닫기</button>
                </div>
            </_Modal> }

            <button onClick={ e => componentSaveCheck(e) }>컴포넌트 저장 확인</button>
            { dataArr.map( (e,id) => {
                return <div key={id}>{e}</div>;
            })}
            <ImageConvert/>
        </>
    )
}
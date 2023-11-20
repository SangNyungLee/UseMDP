import { useState } from "react";
import DataReader from "../DataReader";

export default function DataReaderModal({setState}){
    const [ modalPosition, setModalPosition ] = useState();
    const [ modalVisible, setModalVisible ] = useState(false);


    const handleMouseClick = (e) => {
        const { clientX, clientY } = e;
        setModalPosition({ left: clientX + 10, top: clientY + window.scrollY });
        setModalVisible( prev => !prev )
    }

    return (
        <>
            <button type="button" onClick={handleMouseClick}> 데이터 읽기 </button>
            { modalVisible &&
                <div style={{...modalPosition,position:"absolute", zIndex: 1}}>
                    <DataReader setState={setState} onRead={setModalVisible}/>
                </div> }
        </>
    )
}
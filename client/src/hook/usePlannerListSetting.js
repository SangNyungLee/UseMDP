import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function usePlannerListSetting(){
    const site = useSelector( state => state.site );

    const plannerAxios = async () => {
        const result = await axios({

        })
    }

    useEffect(()=>{
        if(site){
            const { isLogin, isData } = site;
            if( isLogin && !isData ){
                plannerAxios();
            }
        }
    },[site])

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        readFileContents(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    const readFileContents = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContents = e.target.result;
            setState(fileContents)
        };
        reader.readAsText(file);
    };

    const readerRegister = {
        onDrop: handleDrop,
        onDragOver: handleDragOver,
    }

    return readerRegister
}
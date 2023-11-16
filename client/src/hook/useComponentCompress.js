import LZUTF8 from 'lzutf8';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

export default function useComponentCompress(){

    const componentCompress = (component) => {
        const componentString = ReactDOMServer.renderToString(component);
        const compressedString = LZUTF8.compress(componentString,{outputEncoding: "Base64"});
        return compressedString
    }

    const componentDecompress = (componentString) => {
        const decompressedString = LZUTF8.decompress(componentString,{inputEncoding:"Base64"});
        return parse(decompressedString);
    }


    return { componentCompress, componentDecompress };
}
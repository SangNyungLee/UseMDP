export default function DataDownload(title,content){
    const jsonContent = JSON.stringify(content,null,2)
    // null 자리는 특정 키를 제외할 경우 추가
    // 2는 json 문자열이 읽히기 쉽도록 2칸씩 들여쓰기 되게 하는것
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = title + '-' + new Date().toISOString() + '.json';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// export function lzutf8ImgCompress(img){
//     console.log(img)
//     const textDecoder = new TextDecoder('utf-8'); // 또는 다른 인코딩 설정 가능
//     const decodedString = textDecoder.decode(img);
//     console.log(decodedString.length);
//     const compressedString = LZUTF8.compress(decodedString,{outputEncoding: "Base64"});
//     const twoCompressedString = LZUTF8.compress(compressedString,{outputEncoding: "Base64"});
//     console.log(compressedString.length);
//     return compressedString;
// }

// export function lzutf8Compress(originArr){
//     // 객체 배열 압축 참고용
//     const jsonString = JSON.stringify(originArr);
//     const compressedString = LZUTF8.compress(jsonString,{outputEncoding: "Base64"});
//     return compressedString;
// }

// export function lzutf8Decompress(compressedString){
//     // 객체 배열 압축 해제 참고용
//     const decompressedString = LZUTF8.decompress(compressedString,{inputEncoding:"Base64"});
//     const originArr = JSON.parse(decompressedString)
//     return originArr;
// }
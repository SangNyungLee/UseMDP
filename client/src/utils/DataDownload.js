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
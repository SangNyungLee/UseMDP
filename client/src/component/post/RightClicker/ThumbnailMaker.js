import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

//사용법,ThumnbnailMaker에 Ref를 넣어주면, 그걸 그대로 png파일로 변환한다.
// Ref란, <div ref = {customRef}> 에서 customRef는 useRef()로 만든 객체이다.
export default async function ThumbnailMaker(targetRef) {
    if (!targetRef.current) return;

    try {
        const div = targetRef.current;
        const canvas = await html2canvas(div, { scale: 2 });
        canvas.toBlob((blob) => {
            if (blob !== null) {
                saveAs(blob, 'results.png');
            }
        });
    } catch (error) {
        console.error('Error converting div to image:', error);
    }
}

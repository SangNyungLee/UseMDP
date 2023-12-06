import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

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

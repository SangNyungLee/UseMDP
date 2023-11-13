import { useState } from "react";

export default function ImageConvert(){
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image')) {
            console.log(file.size);
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const maxDimension = 800; // 최대 크기 조절 값
                    
                    let newWidth
                    let newHeight
                    if (img.width > img.height) {
                        newWidth = Math.min(maxDimension, img.width);
                        newHeight = (newWidth / img.width) * img.height;
                    } else {
                        newHeight = Math.min(maxDimension, img.height);
                        newWidth = (newHeight / img.height) * img.width;
                    }
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
                    
                    canvas.toBlob((blob) => {
                        const webpImage = new File([blob], 'image.webp', { type: 'image/webp' });
                        setSelectedFile(webpImage);
                        console.log(webpImage.size)
                    }, 'image/webp');
                };
            };

        reader.readAsDataURL(file);

        }
    };

    return (
        <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {selectedFile && (
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ maxWidth: '100%' }} />
        )}
        </div>
    );
}
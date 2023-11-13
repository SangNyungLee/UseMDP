import React, { useEffect, useRef, useState } from 'react';

const Canvas = () => {
  const [isConverted, setIsConverted] = useState(false);
  const imageRef = useRef();

  const convertToWebP = () => {
    const image = imageRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    context.drawImage(image, 0, 0);

    canvas.toBlob(
      (blob) => {
        const blobURL = URL.createObjectURL(blob);

        // WebP 이미지 다운로드
        const a = document.createElement('a');
        a.href = blobURL;
        a.download = 'your-image.webp';
        a.click();

        setIsConverted(true);
      },
      'image/webp',
      1.0
    );
  };

  useEffect(() => {
    if (isConverted) {
      // 이미지가 WebP로 변환되면 다시 렌더링하여 원본 이미지 대신 WebP 이미지 표시
      const webPImage = document.createElement('img');
      webPImage.src = '/your-image.webp'; // WebP 이미지 파일 경로
      webPImage.alt = 'WebP Image';
      imageRef.current.replaceWith(webPImage);
    }
  }, [isConverted]);

  return (
    <div>
      {isConverted ? (
        <p>Image converted to WebP.</p>
      ) : (
        <div>
          <img
            ref={imageRef}
            src="/your-image.jpg"
            alt="Your Image"
            id="your-image-element-id"
          />
          <button onClick={convertToWebP}>Convert to WebP</button>
        </div>
      )}
    </div>
  );
};

export default Canvas;
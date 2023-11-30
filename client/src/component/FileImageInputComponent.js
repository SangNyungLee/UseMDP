import { useRef, useState } from 'react';
import { Nav, Navbar, Container, Button, Modal } from 'react-bootstrap';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styled from 'styled-components';

const _CropContainer = styled.div`
    position: absolute;
    z-index: 10;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
`;

export default function FileImageInputComponent({ setState }) {
    const aspectRatio = 3 / 2;
    const fileInputRef = useRef();
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ aspect: aspectRatio });
    const [completedCrop, setCompletedCrop] = useState(null);

    const size = {
        width: 900,
        height: 600,
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const resetFileInput = () => {
        const currentFileInput = fileInputRef.current;

        const newFileInput = document.createElement('input');
        newFileInput.type = 'file';
        newFileInput.style.display = 'none';

        newFileInput.addEventListener('change', handleFileChange);

        if (currentFileInput.parentNode) {
            currentFileInput.parentNode.replaceChild(newFileInput, currentFileInput);
        }

        fileInputRef.current = newFileInput;
    };

    const handleFileChange = (event) => {
        console.log('event', event);
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setSrc(reader.result);
        };
        reader.readAsDataURL(file);
        resetFileInput();
    };

    const makeClientCrop = async (crop) => {
        if (src && crop.width && crop.height) {
            const image = new Image();
            image.src = src;

            const canvas = document.createElement('canvas');

            let newWidth, newHeight;

            // Check if the aspect ratio is taller or wider
            if (crop.width / crop.height > aspectRatio) {
                newWidth = crop.width;
                newHeight = crop.width / aspectRatio;
            } else {
                newWidth = crop.height * aspectRatio;
                newHeight = crop.height;
            }
            canvas.width = newWidth;
            canvas.height = newHeight;

            // canvas.width = crop.width;

            // canvas.height = crop.height;

            const context = canvas.getContext('2d');
            context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, newWidth, newHeight);
            // context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
            // .replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
            const croppedBase64 = canvas.toDataURL('image/webp');
            setState(croppedBase64);
            setCompletedCrop({});
        }
    };

    const handleCropComplete = (crop) => {
        setCompletedCrop(crop);
    };

    const handleCropClick = () => {
        makeClientCrop(completedCrop);
        setCompletedCrop({});
        setSrc();
        setCrop({});
    };

    // const handleCropRatio = () => {
    //     const currentRatio = crop.width / crop.height;
    //     if (currentRatio < aspectRatio) {
    //         if ( crop.height * aspectRatio < size.width){
    //             setCrop( prev => ({...prev, width: prev.height * aspectRatio }))
    //         } else {
    //             setCrop( prev => ({...prev, height: prev.width / aspectRatio }))
    //         }
    //     } else if (currentRatio > aspectRatio) {
    //         if ( crop.width / aspectRatio < size.height){
    //             setCrop( prev => ({...prev, height: prev.width / aspectRatio }))
    //         } else {
    //             setCrop( prev => ({...prev, width: prev.height * aspectRatio }))
    //         }
    //     }
    // }

    return (
        <>
            <Button onClick={handleButtonClick} className="mx-2" variant="success">
                File
            </Button>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

            {src && (
                <_CropContainer width={size.width} height={size.height}>
                    <ReactCrop
                        crop={crop}
                        onChange={(newCrop) => setCrop(newCrop)}
                        onComplete={handleCropComplete}
                        keepSelection={false}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }}
                    >
                        <img src={src} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </ReactCrop>
                    <button onClick={handleCropClick}>Crop</button>
                    {/* <button onClick={() => handleCropRatio()}>비율 조정</button> */}
                </_CropContainer>
            )}
        </>
    );
}

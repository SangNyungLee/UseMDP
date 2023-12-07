import { useRef, useState } from 'react';
import { FaImage } from 'react-icons/fa';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styled from 'styled-components';

const _CropBackground = styled.div`
    position: fixed;
    width: 100vw;
    height: 90vh;
    z-index: 90;
    background-color: rgba(0, 0, 0, 0.7);
`;

const _CropContainer = styled.div`
    position: absolute;
    background-color: white;
    border-radius: 15px;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: ${(props) => props.width};
    max-height: ${(props) => props.height};
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-use-select: none;
    user-select: none;
`;

const _ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 10px;
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

            const widthRatio = image.width / crop.width;
            const heightRatio = image.height / crop.height;

            const canvas = document.createElement('canvas');

            // canvas.width = newWidth * widthRatio;
            // canvas.height = newHeight * heightRatio;
            canvas.width = crop.width * widthRatio;
            canvas.height = crop.height * heightRatio;
            const context = canvas.getContext('2d');
            context.drawImage(image, crop.x, crop.y, canvas.width, canvas.height);
            const croppedBase64 = canvas.toDataURL('image/webp');
            setState(croppedBase64);
            setCompletedCrop({});
        }
    };

    const handleCropComplete = (crop) => {
        setCompletedCrop(crop);
    };

    const handleCropClick = () => {
        if (completedCrop.width) {
            makeClientCrop(completedCrop);
        }
        setCompletedCrop({});
        setSrc();
        setCrop({});
    };

    const cancelCrop = () => {
        setCompletedCrop({});
        setSrc();
        setCrop({});
    };

    return (
        <>
            <button onClick={handleButtonClick} type="button" className="button-style-header">
                <FaImage style={{ fontSize: '12px', color: 'white', marginRight: '5px' }} />
                <span className="private-text">Thumbnail</span>
            </button>

            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

            {src && (
                <_CropBackground>
                    <_CropContainer width={size.width} height={size.height}>
                        <ReactCrop crop={crop} onChange={(newCrop) => setCrop(newCrop)} onComplete={handleCropComplete} keepSelection={false} style={{}}>
                            <img
                                src={src}
                                style={{
                                    maxWidth: '600px',
                                    maxHeight: '600px',
                                }}
                            />
                        </ReactCrop>
                        <_ButtonContainer>
                            <button onClick={handleCropClick}>결정</button>
                            <button onClick={cancelCrop}>취소</button>
                        </_ButtonContainer>
                    </_CropContainer>
                </_CropBackground>
            )}
        </>
    );
}

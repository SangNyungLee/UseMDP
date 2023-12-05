import { useRef } from 'react';

import { _Button } from '../constant/css/styledComponents/__WelcomePage';


export default function FileInputComponent({ setState }) {
	const fileInputRef = useRef();

	const handleButtonClick = (e) => {
		e.stopPropagation();
		fileInputRef.current.click();
	};


	const handleFileChange = (event) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const fileContents = e.target.result;
			setState(fileContents);
		};
		reader.readAsText(event.target.files[0]);
	};

	return (
		<>
			<_Button onClick={(e) => handleButtonClick(e)} className='mx-2' variant='dark'>
				File
			</_Button>
			<input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
		</>
	);
}

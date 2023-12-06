import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { validateUnspecifiedPlannerData } from '../utils/DataValidate';
import { readPlanner } from '../utils/DataAxiosParsing';
import { plannerListActions } from '../store/plannerList';
import { requestFail } from './etc/SweetModal';
import { useSelector } from 'react-redux';
import { calendarActions } from '../store/calendar';

export default function FileInputComponent({ children, setState }) {
	const fileInputRef = useRef();
	const plannerList = useSelector((state) => state.plannerList);
	const [readData, setReadData] = useState();
	const dispatch = useDispatch();

	useEffect(() => {
		if (readData) {
			const data = JSON.parse(readData);
			console.log('data', data);
			if (validateUnspecifiedPlannerData(data)) {
				readPlannerData(data, false);
			} else {
				requestFail('플래너 데이터 읽기', '올바르지 않은 형식');
			}
			setReadData();
		}
	}, [readData]);

	const readPlannerData = async (data, specified) => {
		const result = await readPlanner(data, specified);
		if (result) {
			const { plannerId } = result;
			dispatch(plannerListActions.addPlanner(result));
			if (plannerList.length === 0) {
				dispatch(calendarActions.setAll([plannerId]));
			}
		} else {
			requestFail('데이터');
		}
	};

	const handleButtonClick = (e) => {
		e.stopPropagation();
		fileInputRef.current.click();
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.onload = (e) => {
			const fileContents = e.target.result;
			setState ? setState(fileContents) : setReadData(fileContents);
		};
		reader.readAsText(file);
		resetFileInput();
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

	return (
		<>
			<span onClick={(e) => handleButtonClick(e)}>
				{children}
				<input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
			</span>
		</>
	);
}

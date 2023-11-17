import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDayPicker = ({ date }) => {
    const [startDate, setStartDate] = useState(new Date(date));

    return (
        <div>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" />
        </div>
    );
};

export default MyDayPicker;

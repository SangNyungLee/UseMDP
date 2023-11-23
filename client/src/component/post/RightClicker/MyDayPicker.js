import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDayPicker = ({ date,setDate }) => {
    return (
        <div>
            <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="yyyy-MM-dd" />
        </div>
    );
};

export default MyDayPicker;

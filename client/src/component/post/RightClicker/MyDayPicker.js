import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../constant/css/myDayPicker.css";
import "../../../constant/css/index.css";
import styled from "styled-components";

const _Font = styled.div`
  font-family: "Pretendard-Regular";
`;

const MyDayPicker = ({ date, setDate }) => {
  return (
    <_Font>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="yyyy-MM-dd HH:mm"
        showTimeInput
      />
    </_Font>
  );
};

export default MyDayPicker;

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
  const parseCustomDate = (str) => {
    // 여기에 원하는 형식의 문자열을 Date 객체로 파싱하는 로직을 작성
    const parts = str.split(' '); // 예시: "Mon Dec 04 2023 00:00:00 GMT+0900"를 공백으로 분리
    // 여기에 더 구체적인 파싱 로직을 추가할 수 있음
    const year = parseInt(parts[3], 10);
    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(parts[1]);
    const day = parseInt(parts[2], 10);
    const hours = parseInt(parts[4].split(':')[0], 10);
    const minutes = parseInt(parts[4].split(':')[1], 10);

    return new Date(year, monthIndex, day, hours, minutes);
  };
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

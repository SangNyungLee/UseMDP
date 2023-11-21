import React from "react";
import axios from "axios";

export default function TestPage() {
  const goGet = async () => {
    // const result = await axios.get("https://www.usemdp.com/api/test");
    const result = await axios.get("http://localhost:8080/api/test");
    console.log("Get방식 : ", result);
  };

  const goPost = async () => {
    // const result = await axios.post("https://www.usemdp.com/api/test");
    const result = await axios.post("http://localhost:8080/api/test");
    console.log("Post방식 : ", result);
  };

  //   const socialTest = async () =>{
  //     const result = await axios.
  //   }

  return (
    <>
      <h2>Get, POST 테스트</h2>
      <button onClick={goGet}>Get으로 보내기</button>
      <button onClick={goPost}>Post로 보내기</button>

      {/* <button onClick={socialTest}>깃허브로 로그인하기</button> */}
    </>
  );
}

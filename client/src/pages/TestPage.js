import React from "react";
import axios from "axios";

export default function TestPage() {
  const goGet = async () => {
    // const result = await axios.get("https://www.usemdp.com/api/test");
    const result = await axios.get("http://localhost:8080/api/test");
    console.log("Get방식 : ", result);
  };

  const goPost = async () => {
    const result = await axios.post("http://localhost:8080/api/test");
    console.log("Post방식임 : ", result);
  };

  const socialTest = async () => {
    const gitUrl =
      "https://github.com/login/oauth/authorize?client_id=7a786bf0bb97406ac8db";

    window.open(gitUrl, "_blank", "width=600,height=600");
  };

  return (
    <>
      <h2>Get, POST 테스트</h2>
      <button onClick={goGet}>Get으로 보내기</button>
      <button onClick={goPost}>Post로 보내기</button>

      <button onClick={socialTest}>깃허브로 로그인하기</button>
    </>
  );
}

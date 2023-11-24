import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Redirection({ provider }) {
  //쿼리스트링에서 code값만 가져와서 변수에 저장
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");

  const navigate = useNavigate();
  useEffect(() => {
    const func = async () => {
      try {
        if (provider === "google") {
          await axios
            .post(
              `${process.env.REACT_APP_GOOGLE_LOCAL_API_URI}`,
              {
                authorizationCode: code,
              },
              { withCredentials: true }
            )
            .then((res) => {
              navigate("/");
              alert("구글 로그인에 성공하셨습니다.");
            })
            .catch((res) => {
              alert("구글 로그인에 실패하셨습니다..");
            });
        } else if (provider === "github") {
          await axios
            .post(`${process.env.REACT_APP_GITHUB_LOCAL_API_URI}`, {
              authorizationCode: code,
            })
            .then((res) => {
              console.log(res);
              navigate("/");
              alert("깃허브 로그인 성공");
            })
            .catch((res) => {
              alert("깃허브 로그인에 실패하셨습니다..");
            });
        }
      } catch (error) {}
    };
    func();
  }, []);
}

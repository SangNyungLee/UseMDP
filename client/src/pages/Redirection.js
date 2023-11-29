import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { siteActions } from "../store/site";
import { loginFail, loginSuccess } from "../component/etc/SweetModal";

export default function Redirection({ provider }) {
  //쿼리스트링에서 code값만 가져와서 변수에 저장
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
              dispatch(siteActions.setIsLogin(true));
              localStorage.setItem("isLogin", true);
              loginSuccess("구글");
            })
            .catch((res) => {
              loginFail("구글");
            });
        } else if (provider === "github") {
          await axios
            .post(
              `${process.env.REACT_APP_GITHUB_LOCAL_API_URI}`,
              {
                authorizationCode: code,
              },
              { withCredentials: true }
            )
            .then((res) => {
              console.log(res);
              dispatch(siteActions.setIsLogin(true));
              localStorage.setItem("isLogin", true);
              navigate("/");
              loginSuccess("깃허브");
            })
            .catch((res) => {
              loginFail("깃허브");
            });
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    func();
  }, [dispatch, navigate, provider, code]);
}

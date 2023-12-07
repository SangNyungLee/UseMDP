import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { siteActions } from "../store/site";
import { loginFail, loginSuccess } from "../component/etc/SweetModal";

export default function Redirection({ provider }) {
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

              //이름이랑 이미지 사진 로컬 스토리지에 저장
              localStorage.setItem("userName", res.data.data.socialNickname);
              localStorage.setItem(
                "userImage",
                res.data.data.socialProfilePicture
              );
              navigate("/");
              dispatch(siteActions.setIsLogin(true));
              loginSuccess("구글");
            })
            .catch((res) => {
              navigate("/");
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

              //이름이랑 이미지 사진 로컬 스토리지에 저장
              localStorage.setItem("userName", res.data.data.socialNickname);
              localStorage.setItem(
                "userImage",
                res.data.data.socialProfilePicture
              );
              dispatch(siteActions.setIsLogin(true));
              navigate("/");
              loginSuccess("깃허브");
            })
            .catch((res) => {
              navigate("/");
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

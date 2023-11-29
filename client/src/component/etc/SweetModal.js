import Swal from "sweetalert2";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

export const logoutModal = () => {
  Swal.fire({
    icon: "success",
    title: "성공!",
    text: "로그아웃에 성공하셨습니다.!!",
  });
};

export const loginFail = (where) => {
  Swal.fire({
    icon: "error",
    title: `${where} 로그인 실패...`,
    text: "뭔가 잘못된거 같습니다!!!!",
  });
};

export const loginSuccess = (where) => {
  Swal.fire({
    icon: "success",
    title: "성공!",
    text: `${where} 로그인 성공`,
  });
};

export const nyanCat = () => {
  Swal.fire({
    title: "안녕하세요.",
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff url(/images/trees.png)",
    backdrop: `
          rgba(0,0,123,0.4)
          url("/images/dancingpepe.gif")
          left top
          no-repeat
        `,
  });
};

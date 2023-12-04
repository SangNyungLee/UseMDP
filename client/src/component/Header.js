import { useEffect, useState } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";
import { useDispatch, useSelector } from "react-redux";
import { siteActions } from "../store/site";
import { logoutModal, nyanCat, requestFail } from "./etc/SweetModal";
import { postLogout } from "../utils/DataAxios";
export default function Header() {
  const googleLoginId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;
  const googleRedirectUri = process.env.REACT_APP_GOOGLE_LOCAL_REDIRECT_URI;
  const githubLoginId = process.env.REACT_APP_GITHUB_LOGIN_CLIENT_ID;
  const MySwal = withReactContent(Swal);

  //Redux에서 isLogin상태 가져오는거
  const isLoginRedux = useSelector((state) => state.site.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로컬스토리지에 저장된 isLogin을 가져와서 변수에 저장해놓음
  // useEffect(() => {
  //   const checkIsLogin = localStorage.getItem("isLogin");
  //   if (checkIsLogin) {
  //     dispatch(siteActions.setIsLogin(checkIsLogin === "true"));
  //   }
  // }, [dispatch]);

  const isMobile = useMediaQuery({
    query: "(max-width: 576px)",
  });

  const googleLogin = async (e) => {
    e.stopPropagation();
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${googleLoginId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  };

  const githubLogin = (e) => {
    e.stopPropagation();
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubLoginId}`;
  };

  //로그아웃
  const Logout = async (e) => {
    e.stopPropagation();
    const res = await postLogout();
    if (res.status !== 200) {
      requestFail("로그아웃");
    }
    dispatch(siteActions.setAllFalse());
    localStorage.removeItem("isLogin");
    logoutModal();
    navigate("/");
  };

  // //로그아웃 버튼 누를경우 실행되서 서버에 쿠키 삭제 요청하는 함수
  // const axiosLogout = async () => {
  // 	try {
  // 		const res = await postLogout();
  // 		return res;
  // 	} catch (error) {
  // 		console.log(error)
  // 	}
  // };

  const showLoginModal = (e) => {
    e.stopPropagation();
    MySwal.fire({
      title: "LogIn",
      html: (
        <div>
          <GoogleLoginButton onClick={(e) => googleLogin(e)} />
          <GithubLoginButton onClick={(e) => githubLogin(e)} />
        </div>
      ),
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <Navbar bg="light" data-bs-theme="light" fixed="top" className="py-3">
        <Container className="px-4 px-sm-5">
          <Navbar.Brand className="text-success fw-bold" as={NavLink} to={"/"}>
            {/* <img
              src="https://picsum.photos/40/40"
              className="d-inline-block rounded"
              alt="useMPD logo"
            />{" "} */}
            <img src="/images/004.png" width="62px" height="40px" />
          </Navbar.Brand>
          <Nav>
            {isLoginRedux ? (
              <>
                <Button
                  as={NavLink}
                  to={"/roadmap"}
                  className="mx-2"
                  variant="success"
                  size={isMobile ? "sm" : "md"}
                >
                  My Roadmap
                </Button>
                <Button
                  onClick={(e) => Logout(e)}
                  className="mx-2"
                  variant="success"
                  size={isMobile ? "sm" : "md"}
                >
                  Logout
                </Button>
                <Button
                  onClick={nyanCat}
                  className="mx-2"
                  variant="success"
                  size={isMobile ? "sm" : "md"}
                >
                  눌러보세요
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={(e) => showLoginModal(e)}
                  className="mx-2"
                  variant="outline-success"
                  size={isMobile ? "sm" : "md"}
                >
                  Log In
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

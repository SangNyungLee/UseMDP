import { useEffect, useState } from "react";
import { Nav, Navbar, Container, Button, Modal } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

import FileInputComponent from "../FileInputComponent";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { siteActions } from "../../store/site";

export default function HomeHeader() {
  // 모달창 보여주기, 숨기기 상태
  const [show, setShow] = useState(false);
  //   const [isLogin, setIsLogin] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [readData, setReadData] = useState();

  //sweetAlert라이브러리
  const MySwal = withReactContent(Swal);
  //로그인 env
  const googleLoginId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;
  const googleRedirectUri = process.env.REACT_APP_GOOGLE_LOCAL_REDIRECT_URI;
  const githubLoginId = process.env.REACT_APP_GITHUB_LOGIN_CLIENT_ID;

  //Redux에서 isLogin상태 가져오는거
  const isLoginRedux = useSelector((state) => state.site.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (readData) {
      console.log(readData);
    }
  }, [readData]);

  // 로컬스토리지에 저장된 isLogin을 가져와서 변수에 저장해놓음
  useEffect(() => {
    const checkIsLogin = localStorage.getItem("isLogin");
    if (checkIsLogin) {
      dispatch(siteActions.setIsLogin(checkIsLogin === "true"));
    }
  }, [dispatch]);

  // 반응형으로 모바일 화면일때 헤더 버튼 크기 줄이기
  const isMobile = useMediaQuery({
    query: "(max-width: 576px)",
  });

  //로그인 모달창
  const showLoginModal = () => {
    MySwal.fire({
      title: "LogIn",
      html: (
        <div>
          <GoogleLoginButton onClick={googleLogin} />
          <GithubLoginButton onClick={githubLogin} />
        </div>
      ),
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  ///////로그인버튼///////
  const googleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${googleLoginId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  };

  const githubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubLoginId}`;
  };

  //로그아웃
  const Logout = () => {
    dispatch(siteActions.setIsLogin(false));
    localStorage.removeItem("isLogin");
    alert("로그아웃 되셨습니다.");
    navigate("/");
  };

  return (
    <>
      <Navbar bg="light" data-bs-theme="light" fixed="top" className="py-3">
        <Container className="px-3 px-sm-5">
          <Navbar.Brand className="text-success fw-bold">
            <img
              src="https://picsum.photos/40/40"
              className="d-inline-block rounded"
              alt="useMPD logo"
            />
            useMDP
          </Navbar.Brand>
          <Nav>
            {isLoginRedux ? (
              <>
                <Button
                  onClick={Logout}
                  className="mx-2"
                  variant="outline-success"
                  size={isMobile ? "sm" : "md"}
                >
                  Log Out
                </Button>
                <FileInputComponent setState={setReadData} />
              </>
            ) : (
              <>
                <Button
                  onClick={showLoginModal}
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

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        {isLoginRedux ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>LogOut</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="primary">Close</Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>LogIn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <GoogleLoginButton onClick={googleLogin} />
              <GithubLoginButton onClick={githubLogin} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary">Close</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}

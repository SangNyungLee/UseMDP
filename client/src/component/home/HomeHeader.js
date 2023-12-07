import { useState } from "react";
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
import { logoutModal, requestFail } from "../etc/SweetModal";
import { postLogout } from "../../utils/DataAxios";

export default function HomeHeader() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  const MySwal = withReactContent(Swal);

  const googleLoginId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;
  const googleRedirectUri = process.env.REACT_APP_GOOGLE_LOCAL_REDIRECT_URI;
  const githubLoginId = process.env.REACT_APP_GITHUB_LOGIN_CLIENT_ID;


  const isLoginRedux = useSelector((state) => state.site.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({
    query: "(max-width: 576px)",
  });


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

  const googleLogin = (e) => {
    e.stopPropagation();
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${googleLoginId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  };

  const githubLogin = (e) => {
    e.stopPropagation();
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubLoginId}`;
  };

  const Logout = async (e) => {
    e.stopPropagation();
    dispatch(siteActions.setIsLogin(false));
    localStorage.removeItem("isLogin");
    logoutModal();
    const res = await postLogout();
    if (res.status !== 200) {
      requestFail("로그아웃");
    }
    navigate("/");
  };

  return (
    <>
      <Navbar bg="light" data-bs-theme="light" fixed="top" className="py-3">
        <Container className="px-3 px-sm-5">
          <Navbar.Brand className="text-success fw-bold" as={NavLink} to={"/"}>
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
                  onClick={(e) => Logout(e)}
                  className="mx-2"
                  variant="outline-success"
                  size={isMobile ? "sm" : "md"}
                >
                  Log Out
                </Button>
                <FileInputComponent>
                  <Button variant="outline-success" size="lg" className="mx-2">
                    불러오기
                  </Button>
                </FileInputComponent>
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
              <GoogleLoginButton onClick={(e) => googleLogin(e)} />
              <GithubLoginButton onClick={(e) => githubLogin(e)} />
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

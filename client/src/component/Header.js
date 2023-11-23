import { useEffect, useState } from "react";
import { Nav, Navbar, Container, Button, Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

export default function Header() {
  // 모달창 보여주기, 숨기기 상태
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 반응형으로 모바일 화면일때 헤더 버튼 크기 줄이기
  const isMobile = useMediaQuery({
    query: "(max-width: 576px)",
  });

  ///////로그인버튼///////
  const googleLogin = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/auth?client_id=25234701637-os7792gto1sgkjh5i14lev582mklj7l5.apps.googleusercontent.com&redirect_uri=http://localhost:8080/login/oauth2/code/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
  };

  const githubLogin = () => {
    console.log("깃허브로그인 ㅋ");
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
            />{" "}
            useMDP
          </Navbar.Brand>
          <Nav>
            <Button
              onClick={handleShow}
              className="mx-2"
              variant="outline-success"
              size={isMobile ? "sm" : "md"}
            >
              Log In
            </Button>
            <Button
              as={NavLink}
              to={"/roadmap"}
              className="mx-2"
              variant="success"
              size={isMobile ? "sm" : "md"}
            >
              My Roadmap
            </Button>
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
        <Modal.Header closeButton>
          <Modal.Title>LogIn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GoogleLoginButton onClick={googleLogin} />
          <GithubLoginButton onClick={githubLogin} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">exit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

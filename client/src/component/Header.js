import { useEffect, useState } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

const MySwal = withReactContent(Swal);

export default function Header() {
  const googleLoginId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;
  const googleRedirectUri = process.env.REACT_APP_GOOGLE_LOCAL_REDIRECT_URI;
  const githubLoginId = process.env.REACT_APP_GITHUB_LOGIN_CLIENT_ID;

  const isMobile = useMediaQuery({
    query: "(max-width: 576px)",
  });

  const googleLogin = async () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${googleLoginId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  };

  const githubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubLoginId}`;
  };

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
              onClick={showLoginModal}
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
    </>
  );
}

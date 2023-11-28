import { useEffect, useState } from 'react';
import { Nav, Navbar, Container, Button, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { GithubLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import FileInputComponent from '../FileInputComponent';

export default function HomeHeader() {
    // 모달창 보여주기, 숨기기 상태
    const [show, setShow] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [readData, setReadData] = useState();

    useEffect(() => {
        if (readData) {
            console.log(readData);
        }
    }, [readData]);

    // 반응형으로 모바일 화면일때 헤더 버튼 크기 줄이기
    const isMobile = useMediaQuery({
        query: '(max-width: 576px)',
    });

    ///////로그인버튼///////
    const googleLogin = () => {
        // window.location.href =
        //   "https://accounts.google.com/o/oauth2/auth?client_id=25234701637-os7792gto1sgkjh5i14lev582mklj7l5.apps.googleusercontent.com&redirect_uri=http://localhost:8080/login/oauth2/code/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
        setIsLogin(true);
    };

    const githubLogin = () => {
        // console.log("깃허브로그인 ㅋ");
        setIsLogin(true);
    };

    //로그아웃
    const Logout = () => {
        setIsLogin(false);
    };

    return (
        <>
            <Navbar bg="light" data-bs-theme="light" fixed="top" className="py-3">
                <Container className="px-3 px-sm-5">
                    <Navbar.Brand className="text-success fw-bold">
                        <img src="https://picsum.photos/40/40" className="d-inline-block rounded" alt="useMPD logo" />
                        useMDP
                    </Navbar.Brand>
                    <Nav>
                        {isLogin ? (
                            <>
                                <Button onClick={Logout} className="mx-2" variant="outline-success" size={isMobile ? 'sm' : 'md'}>
                                    Log Out
                                </Button>
                                <FileInputComponent setState={setReadData} />
                            </>
                        ) : (
                            <>
                                <Button onClick={handleShow} className="mx-2" variant="outline-success" size={isMobile ? 'sm' : 'md'}>
                                    Log In
                                </Button>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                {isLogin ? (
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

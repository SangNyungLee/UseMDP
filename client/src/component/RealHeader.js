import '../constant/css/RealHeader.css';

//추가된거


import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";
import { useDispatch, useSelector } from "react-redux";
import { siteActions } from "../store/site";
import { logoutModal, requestFail } from "./etc/SweetModal";
import { postLogout } from "../utils/DataAxios";
import { FaFileUpload } from "react-icons/fa";
import FileInputComponent from "./FileInputComponent";




export default function RealHeader() {
	const googleLoginId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;
	const googleRedirectUri = process.env.REACT_APP_GOOGLE_LOCAL_REDIRECT_URI;
	const githubLoginId = process.env.REACT_APP_GITHUB_LOGIN_CLIENT_ID;
	const MySwal = withReactContent(Swal);

	//유저 이미지, 이름 저장
	const HeaderUserImage = localStorage.getItem('userImage');
	const HeaderUserName = localStorage.getItem('userName');
	//Redux에서 isLogin상태 가져오는거
	const isLoginRedux = useSelector((state) => state.site.isLogin);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isMobile = useMediaQuery({
		query: '(max-width: 576px)',
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
			requestFail('로그아웃');
		}
		dispatch(siteActions.setAllFalse());
		localStorage.removeItem('isLogin');
		logoutModal();
		navigate('/');
	};
	// //로그아웃 버튼 누를경우 실행되서 서버에 쿠키 삭제 요청하는 함수
	// const axiosLogout = async () => {
	//   try {
	//     const res = await postLogout();
	//     if (res.status !== 200){
	//       requestFail("로그아웃")
	//     }
	//   } catch (error) {
	//     console.log(error);
	//   }
	// };

	const showLoginModal = (e) => {
		e.stopPropagation();
		MySwal.fire({
			title: 'LogIn',
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

	const clickLogo = (e) => {
		e.stopPropagation();
		navigate('/');
	};

	return (
		<div className='realheader' id='RealHeader'>
			<div
				className='header-logo'
				onClick={(e) => {
					clickLogo(e);
				}}>
				<img src='/images/004.png' width='60px' height='40px' />
				{/* useMDP */}
			</div>
			{/* <div className="header-menu">
          <a className="active">메뉴 1번</a>
          <a>메뉴 2번</a>
          <a>메뉴 3번</a>
        </div> */}

        {isLoginRedux ? (
          <>
            <div className="user-settings">
              <div className="uploadIcon user-menu" >
                <FileInputComponent>
                  <FaFileUpload />
                </FileInputComponent>
              </div>
              <div className="dark-light">{/* <CiDark /> */}</div>
              <div className="user-menu" onClick={(e) => Logout(e)}>
                로그아웃
              </div>
              <img
                className="user-profile"
                src={HeaderUserImage}
                alt="userImage"
              />
              <div className="user-name">{HeaderUserName}</div>
            </div>
          </>
        ) : (
          <>
            <div className="user-settings">
              <span className="user-login" onClick={(e) => showLoginModal(e)}>
                로그인
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );

}

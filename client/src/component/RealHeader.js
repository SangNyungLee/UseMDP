import '../constant/css/RealHeader.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { siteActions } from '../store/site';
import { logoutModal, requestFail } from './etc/SweetModal';
import { postLogout } from '../utils/DataAxios';
import { MdOutlineFileUpload } from 'react-icons/md';
import FileInputComponent from './FileInputComponent';

export default function RealHeader() {
	const googleLoginId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;
	const googleRedirectUri = process.env.REACT_APP_GOOGLE_LOCAL_REDIRECT_URI;
	const githubLoginId = process.env.REACT_APP_GITHUB_LOGIN_CLIENT_ID;
	const MySwal = withReactContent(Swal);

	const HeaderUserImage = localStorage.getItem('userImage');
	const HeaderUserName = localStorage.getItem('userName');
	const isLoginRedux = useSelector((state) => state.site.isLogin);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const googleLogin = async (e) => {
		e.stopPropagation();
		window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${googleLoginId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
	};

	const githubLogin = (e) => {
		e.stopPropagation();
		window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubLoginId}`;
	};

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
			</div>

			{isLoginRedux ? (
				<>
					<div className='user-settings'>
						<div className='uploadIcon user-menu'>
							<FileInputComponent>
								<MdOutlineFileUpload />
							</FileInputComponent>
						</div>
						<div className='dark-light'></div>
						<div className='user-menu' onClick={(e) => Logout(e)}>
							로그아웃
						</div>
						<img className='user-profile' src={HeaderUserImage} alt='userImage' />
						<div className='user-name'>{HeaderUserName}</div>
					</div>
				</>
			) : (
				<>
					<div className='user-settings'>
						<span className='user-login' onClick={(e) => showLoginModal(e)}>
							로그인
						</span>
					</div>
				</>
			)}
		</div>
	);
}

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Redirection({ provider }) {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const code = urlParams.get('code');
	console.log(code);
	const navigate = useNavigate();
	useEffect(() => {
		const func = async () => {
			try {
				if (provider === 'google') {
					await axios
						.post(
							'http://localhost:8080/api/googleCode',
							{
								authorizationCode: code,
							},
							{ withCredentials: true }
						)
						.then((res) => {
							console.log(res.data);
							console.log(document.cookie);
							navigate('/');
						})
						.catch((res) => {
							console.log('구글 로그인오류');
						});
				} else if (provider === 'github') {
					console.log('깃허브');
					await axios
						.post(
							'http://localhost:8080/api/githubCode',
							{
								authorizationCode: code,
							},
							{ withCredentials: true }
						)
						.then((res) => {
							console.log(res.data);
							console.log(document.cookie);
							navigate('/');
						})
						.catch((res) => {
							console('깃허브 로그인오류');
						});
				}
			} catch (error) {}
		};
		func();
	}, []);
}

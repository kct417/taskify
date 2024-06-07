import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import useBanner from '../hooks/UseBanner';
import Form from '../components/Form';
import AuthPageWrapper from '../components/AuthPageWrapper';
import { TASKIFY_THEME_COLOR, API_PREFIX } from '../constants';

const Login = ({ updateUser }) => {
	const navigate = useNavigate();
	const { showBanner, bannerState } = useBanner();

	async function loginUser(credentials) {
		try {
			const response = await fetch(`${API_PREFIX}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
			});
			if (response.status === 200) {
				const payload = await response.json();
				const divResp = await fetch(
					`${API_PREFIX}/${payload.username}`,
					{
						headers: addAuthHeader(payload.token),
					},
				);
				const dividers = await divResp.json();
				updateUser(
					payload.token,
					payload.username,
					payload.streak,
					dividers,
					() => {
						console.log(
							`Login successful for user: '${payload.username}'`,
						);
						console.log(`Auth token saved`);
						navigate(`/${payload.username}`);
					},
				);
			} else {
				const text = await response.text();
				throw new Error(`Login Error ${response.status}: ${text}`);
			}
		} catch (error) {
			console.error(error);
			showBanner(
				'Oh no!',
				'Something went wrong. Check your username and password.',
				'danger',
			);
		}
	}

	function addAuthHeader(token) {
		return {
			Authorization: `Bearer ${token}`,
		};
	}

	const header = (
		<>
			Welcome to{' '}
			<strong style={{ color: TASKIFY_THEME_COLOR }}>Taskify</strong>
		</>
	);
	return (
		<AuthPageWrapper
			header={header}
			alternateText={"Don't have an account?"}
			alternateButtonText={'Sign up'}
			alternateButtonOnClick={() => navigate('/signup')}
			bannerState={bannerState}>
			<Form
				fields={[
					{
						label: 'Username',
						placeholder: 'Enter your username',
						key: 'username',
					},
					{
						label: 'Password',
						placeholder: 'Enter your password',
						type: 'password',
						key: 'password',
					},
				]}
				submitFunc={loginUser}
				buttonText={'Log In'}
			/>
		</AuthPageWrapper>
	);
};

Login.propTypes = {
	updateUser: PropTypes.func.isRequired,
};

export default Login;

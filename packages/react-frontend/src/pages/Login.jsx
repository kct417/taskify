import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import useBanner from '../hooks/UseBanner';
import Form from '../components/Form';
import AuthPageWrapper from '../components/AuthPageWrapper';
import { TASKIFY_THEME_COLOR, API_PREFIX } from '../constants';

const Login = ({ updateUser }) => {
	Login.propTypes = {
		updateUser: PropTypes.func.isRequired,
	};

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
			if (response.ok) {
				const payload = await response.json();

				const dividerResponse = await fetch(
					`${API_PREFIX}/${payload.username}`,
					{
						headers: {
							Authorization: `Bearer ${payload.token}`,
						},
					},
				);

				const dividers = await dividerResponse.json();

				updateUser(
					payload.token,
					payload.username,
					payload.streak,
					dividers,
					() => {
						navigate(`/${payload.username}`);
					},
				);
			} else {
				const text = await response.text();
				throw new Error(`Login Error ${response.status}: ${text}`);
			}
		} catch (error) {
			console.error(error);
			if (error.message.includes('Invalid username or password')) {
				showBanner(
					'Oops!',
					'Looks like you entered an invalid username or password.',
					'danger',
				);
			} else {
				showBanner(
					'Oh no!',
					'Something went wrong. Please try again later.',
					'danger',
				);
			}
		}
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

export default Login;

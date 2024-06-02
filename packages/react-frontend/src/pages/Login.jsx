import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import useBanner from '../hooks/UseBanner';
import Form from '../components/Form';
import AuthPageWrapper from '../components/AuthPageWrapper';

const LoginForm = ({ API_PREFIX, handleLoginAndRegister }) => {
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
				handleLoginAndRegister(payload.token, payload.username, () => {
					console.log(
						`Login successful for user: '${payload.username}'`,
					);
					console.log(`Auth token saved`);
					navigate('/');
				});
			} else {
				const text = await response.text();
				throw new Error(`Login Error ${response.status}: ${text}`);
			}
		} catch (error) {
			showBanner('Error!', error.message, 'danger');
		}
	}

	const header = (
		<>
			Welcome to <strong style={{ color: '#F38D8D' }}>Taskify</strong>
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

LoginForm.propTypes = {
	API_PREFIX: PropTypes.string.isRequired,
	handleLoginAndRegister: PropTypes.func.isRequired,
};

export default LoginForm;

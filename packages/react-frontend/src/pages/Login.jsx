import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import BannerPageWrapper from '../components/BannerPageWrapper';
import Form from '../components/Form';
import AuthPageWrapper from '../components/AuthPageWrapper';

const LoginForm = ({ API_PREFIX, handleLoginAndRegister }) => {
	const navigate = useNavigate();

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
				handleLoginAndRegister(payload.token, () => {
					console.log(
						`Login successful for user: '${credentials.username}', Auth token saved`,
					);
					navigate('/home');
				});
			} else {
				const text = await response.text();
				throw new Error(`Login Error ${response.status}: ${text}`);
			}
		} catch (error) {
			alert('Error!', error.message, 'danger');
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
			optionText={"Don't have an account?"}
			optionButtonText={'Sign up'}
			optionButtonOnClick={() => navigate('/signup')}>
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

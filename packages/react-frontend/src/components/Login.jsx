import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Form from './Form';

const LoginForm = ({ API_PREFIX, handleLoginAndRegister }) => {
	const navigate = useNavigate();

	async function loginUser(creds) {
		try {
			const response = await fetch(`${API_PREFIX}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(creds),
			});

			if (response.status === 200) {
				const payload = await response.json();
				handleLoginAndRegister(payload.token, () => {
					console.log(
						`Login successful for user: '${creds.username}'`,
					);
					console.log(`Auth token saved`);
					navigate('/tasks');
				});
			} else {
				const text = await response.text();
				throw new Error(`Login Error ${response.status}: ${text}`);
			}
		} catch (error) {
			console.log(`Login Error: ${error.message}`);
		}
	}

	return (
		<Form
			fields={[
				['username', 'Create your username'],
				['password', 'Create your password'],
			]}
			submitFunc={loginUser}
			buttonText={'Log In'}
		/>
	);
};

LoginForm.propTypes = {
	API_PREFIX: PropTypes.string,
	handleLoginAndRegister: PropTypes.func.isRequired,
};

export default LoginForm;

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Form from './Form';

const RegistrationForm = ({ API_PREFIX, handleLoginAndRegister }) => {
	const navigate = useNavigate();

	async function registerUser(creds) {
		try {
			const response = await fetch(`${API_PREFIX}/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(creds),
			});

			if (response.status === 201) {
				const payload = await response.json();
				handleLoginAndRegister(payload.token, () => {
					console.log(
						`Registration successful for user: '${creds.username}'`,
					);
					console.log(`Auth token saved`);
					navigate('/tasks');
				});
			} else {
				const text = await response.text();
				throw new Error(
					`Registration Error ${response.status}: ${text}`,
				);
			}
		} catch (error) {
			console.log(`Registration Error: ${error.message}`);
		}
	}

	return (
		<Form
			fields={[
				['firstName', 'Enter your firstname'],
				['lastName', 'Enter your lastname'],
				['username', 'Create your username'],
				['password', 'Create your password'],
			]}
			submitFunc={registerUser}
			buttonText={'Sign Up'}
		/>
	);
};

RegistrationForm.propTypes = {
	API_PREFIX: PropTypes.string,
	handleLoginAndRegister: PropTypes.func.isRequired,
};

export default RegistrationForm;

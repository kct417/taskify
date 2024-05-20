import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Form from '../components/Form';

const RegistrationForm = ({ API_PREFIX, handleLoginAndRegister }) => {
	const navigate = useNavigate();

	async function registerUser(credentials) {
		try {
			const response = await fetch(`${API_PREFIX}/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
			});

			if (response.status === 201) {
				const payload = await response.json();
				handleLoginAndRegister(payload.token, () => {
					console.log(
						`Registration successful for user: '${credentials.username}'`,
					);
					console.log(`Auth token saved`);
					navigate('/home');
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
				{
					label: 'First Name',
					placeholder: 'Enter your first name',
					key: 'firstName',
				},
				{
					label: 'Last Name',
					placeholder: 'Enter your last name',
					key: 'lastName',
				},
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

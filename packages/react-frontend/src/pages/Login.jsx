import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerAlert from '../components/BannerAlert';

import Form from '../components/Form';

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
						`Login successful for user: '${credentials.username}'`,
					);
					console.log(`Auth token saved`);
					navigate('/home');
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
		<>
			<BannerAlert
				message={'This is a test'}
				type={'primary'}
				duration={6000}
			/>
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
		</>
	);
};

LoginForm.propTypes = {
	API_PREFIX: PropTypes.string,
	handleLoginAndRegister: PropTypes.func.isRequired,
};

export default LoginForm;

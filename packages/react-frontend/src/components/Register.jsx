import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register(props) {
	const [creds, setCreds] = useState({
		username: '',
		password: '',
	});
	const navigate = useNavigate();

	function handleChange(event) {
		const { name, value } = event.target;
		switch (name) {
			case 'username':
				setCreds({ ...creds, username: value });
				break;
			case 'password':
				setCreds({ ...creds, password: value });
				break;
		}
	}

	async function registerUser() {
		try {
			const response = await fetch(`${props.API_PREFIX}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(creds),
			});

			if (response.status === 201) {
				const payload = await response.json();
				props.handleLoginAndRegister(payload.token, () => {
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
		<form>
			<label htmlFor="username">UserName</label>
			<input
				type="text"
				name="username"
				id="username"
				value={creds.username}
				onChange={handleChange}
			/>
			<label htmlFor="password">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				value={creds.password}
				onChange={handleChange}
			/>
			<input type="button" value={'Register'} onClick={registerUser} />
		</form>
	);
}

Register.propTypes = {
	API_PREFIX: PropTypes.string,
	handleLoginAndRegister: PropTypes.func.isRequired,
};

export default Register;

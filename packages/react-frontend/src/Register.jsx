import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register(props) {
	const [creds, setCreds] = useState({
		username: '',
		password: '',
	});
	const [registrationSuccess, setRegistrationSuccess] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (registrationSuccess) {
			navigate('/tasks');
		}
	}, [registrationSuccess, navigate]);

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

	function registerUser() {
		const promise = fetch(`${props.API_PREFIX}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(creds),
		})
			.then((response) => {
				if (response.status === 201) {
					response
						.json()
						.then((payload) => props.setToken(payload.token));
					console.log(
						`Registration successful for user: '${creds.username}'`,
					);
					console.log(`Auth token saved`);
					setRegistrationSuccess(true);
				} else {
					response
						.text()
						.then((text) =>
							console.log(
								`Registration Error ${response.status}: ${text}`,
							),
						);
				}
			})
			.catch((error) => {
				console.log(`Registration Error: ${error}`);
			});

		return promise;
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
	setToken: PropTypes.func.isRequired,
};

export default Register;

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
	const [creds, setCreds] = useState({
		username: '',
		password: '',
	});
	const navigate = useNavigate();

	function handleChange(event) {
		const { name, value } = event.target;
		setCreds({ ...creds, [name]: value });
	}

	async function loginUser() {
		try {
			const response = await fetch(`${props.API_PREFIX}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(creds),
			});

			if (response.status === 200) {
				const payload = await response.json();
				props.handleLoginAndRegister(payload.token, () => {
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
		// <form>
		// 	<label htmlFor="username">UserName</label>
		// 	<input
		// 		type="text"
		// 		name="username"
		// 		id="username"
		// 		value={creds.username}
		// 		onChange={handleChange}
		// 	/>
		// 	<label htmlFor="password">Password</label>
		// 	<input
		// 		type="password"
		// 		name="password"
		// 		id="password"
		// 		value={creds.password}
		// 		onChange={handleChange}
		// 	/>
		// 	<input type="button" value={'Log In'} onClick={loginUser} />
		// </form>
		<div className="container">
			<form className="vstack">
				<div className="form-group text-left">
					<label>Username</label>
					<input
						type="text"
						className="form-control"
						id="username"
						name="username"
						placeholder="Enter your username"
						value={creds.username}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group text-left">
					<label>Password</label>
					<input
						type="password"
						className="form-control"
						id="password"
						name="password"
						placeholder="Enter your password"
						value={creds.password}
						onChange={handleChange}
					/>
				</div>
				<button
					type="button"
					className="btn btn-primary"
					onClick={loginUser}>
					Log In
				</button>
			</form>
		</div>
	);
}

Login.propTypes = {
	API_PREFIX: PropTypes.string,
	handleLoginAndRegister: PropTypes.func.isRequired,
};

export default Login;

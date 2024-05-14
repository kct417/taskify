import react from 'react';

const LoginForm = () => {
	return (
		<form className="vstack">
			<div className="form-group text-left">
				<label>Username</label>
				<input
					type="text"
					className="form-control"
					placeholder="Enter your username"
				/>
			</div>
			<div className="form-group text-left">
				<label>Password</label>
				<input
					type="password"
					className="form-control"
					placeholder="Enter your password"
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export default LoginForm;

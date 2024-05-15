import Form from './Form';

const LoginForm = () => {
	return (
		<Form
			fields={[
				['Username', 'Enter your username'],
				['Password', 'Enter your password'],
			]}
		/>
	);
};

export default LoginForm;

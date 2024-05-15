import Form from './Form';

const SignUpForm = () => {
	return (
		<Form
			fields={[
				['Firstname', 'Enter your firstname'],
				['Lastname', 'Enter your lastname'],
				['Username', 'Create your username'],
				['Password', 'Create your password'],
			]}
		/>
	);
};

export default SignUpForm;

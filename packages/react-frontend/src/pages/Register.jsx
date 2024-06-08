import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AuthPageWrapper from '../components/AuthPageWrapper';
import Form from '../components/Form';
import useBanner from '../hooks/UseBanner';
import { TASKIFY_THEME_COLOR, API_PREFIX } from '../constants';

const Register = ({ updateUser }) => {
	Register.propTypes = {
		updateUser: PropTypes.func.isRequired,
	};

	const navigate = useNavigate();
	const { showBanner, bannerState } = useBanner();

	async function registerUser(credentials) {
		try {
			const response = await fetch(`${API_PREFIX}/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
			});

			if (response.ok) {
				const payload = await response.json();

				const dividerResponse = await fetch(
					`${API_PREFIX}/${payload.username}`,
					{
						headers: {
							Authorization: `Bearer ${payload.token}`,
						},
					},
				);

				const dividers = await dividerResponse.json();

				updateUser(
					payload.token,
					payload.username,
					payload.streak,
					dividers,
					() => {
						navigate(`/${payload.username}`);
					},
				);
			} else {
				const text = await response.text();
				throw new Error(
					`Registration Error ${response.status}: ${text}`,
				);
			}
		} catch (error) {
			console.error(error);
			if (error.message.includes('Username already taken')) {
				showBanner(
					'Oops!',
					'That username is already taken please try something else.',
					'danger',
				);
			} else {
				showBanner(
					'Oops!',
					'Something went wrong trying to sign up. Please try again later.',
					'danger',
				);
			}
		}
	}

	const header = (
		<>
			Create your{' '}
			<strong style={{ color: TASKIFY_THEME_COLOR }}>Taskify</strong>{' '}
			account
		</>
	);
	return (
		<AuthPageWrapper
			header={header}
			alternateText={'Already have an account?'}
			alternateButtonText={'Log In'}
			alternateButtonOnClick={() => navigate('/')}
			bannerState={bannerState}>
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
		</AuthPageWrapper>
	);
};

export default Register;

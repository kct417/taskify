import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AuthPageWrapper from '../components/AuthPageWrapper';

import Form from '../components/Form';
import useBanner from '../hooks/UseBanner';

const RegistrationForm = ({ API_PREFIX, handleLoginAndRegister }) => {
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

			if (response.status === 201) {
				const payload = await response.json();
				const divResp = await fetch(
					`${API_PREFIX}/${payload.username}`,
					{
						headers: addAuthHeader(payload.token),
					},
				);
				const dividers = await divResp.json();
				handleLoginAndRegister(
					payload.token,
					payload.username,
					payload.streak,
					dividers,
					() => {
						console.log(
							`Registration successful for user: '${payload.username}'`,
						);
						console.log(`Auth token saved`);
						navigate('/');
					},
				);
			} else {
				const text = await response.text();
				throw new Error(
					`Registration Error ${response.status}: ${text}`,
				);
			}
		} catch (error) {
			showBanner('Registration Error:', error.message, 'danger');
		}
	}

	function addAuthHeader(token) {
		return {
			Authorization: `Bearer ${token}`,
		};
	}

	const header = (
		<>
			Create your <strong style={{ color: '#F38D8D' }}>Taskify</strong>{' '}
			account
		</>
	);
	return (
		<AuthPageWrapper
			header={header}
			alternateText={'Already have an account?'}
			alternateButtonText={'Log In'}
			alternateButtonOnClick={() => navigate('/login')}
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

RegistrationForm.propTypes = {
	API_PREFIX: PropTypes.string.isRequired,
	handleLoginAndRegister: PropTypes.func.isRequired,
};

export default RegistrationForm;

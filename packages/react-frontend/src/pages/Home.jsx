import PropTypes from 'prop-types';
import { useState } from 'react';

import HomeList from '../components/HomeList';
import Sidebar from '../components/Sidebar';

const Home = ({ API_PREFIX, user, setUser }) => {
	return (
		<div
			className="d-flex"
			style={{ height: '100vh', overflowY: 'hidden' }}>
			<Sidebar API_PREFIX={API_PREFIX} user={user} setUser={setUser} />
			<div
				className="container-fluid p-0 d-flex"
				style={{ overflowY: 'auto' }}>
				<HomeList
					API_PREFIX={API_PREFIX}
					user={user}
					updateUserData={setUser}
				/>
			</div>
		</div>
	);
};

Home.propTypes = {
	API_PREFIX: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired,
};

export default Home;

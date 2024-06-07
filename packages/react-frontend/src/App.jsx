import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
	const INVALID_TOKEN = 'INVALID_TOKEN';
	const INVALID_USERNAME = 'INVALID_USERNAME';
	const [user, updateUser] = useState({
		token: INVALID_TOKEN,
		username: INVALID_USERNAME,
		streak: 0,
		dividers: [],
	});

	const setUser = (newToken, username, streak, dividers, callback) => {
		updateUser({
			token: newToken,
			username: username,
			streak: streak,
			dividers: dividers,
		});
		if (callback) {
			callback();
		}
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login updateUser={setUser} />} />
				<Route
					path="/signup"
					element={<Register updateUser={setUser} />}
				/>
				<Route
					path={`/:username?/:dividerName?/:folderName?`}
					element={<Home user={user} updateUser={setUser} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

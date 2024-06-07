import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Folder from './pages/Folder';

// const API_PREFIX = 'https://taskify-api.azurewebsites.net';
const API_PREFIX = 'https://13.56.12.195:8000';


function App() {
	const INVALID_TOKEN = 'INVALID_TOKEN';
	const INVALID_USERNAME = 'INVALID_USERNAME';
	const [user, setUser] = useState({
		token: INVALID_TOKEN,
		username: INVALID_USERNAME,
		streak: 0,
		dividers: [],
	});

	const populateUser = (newToken, username, streak, dividers, callback) => {
		setUser({
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
				<Route
					path="/"
					element={
						<div>
							<Home
								API_PREFIX={API_PREFIX}
								user={user}
								setUser={populateUser}
							/>
						</div>
					}
				/>
				<Route
					path="/login"
					element={
						<div>
							<Login
								API_PREFIX={API_PREFIX}
								setUser={populateUser}
							/>
						</div>
					}
				/>
				<Route
					path="/signup"
					element={
						<div>
							<Register
								API_PREFIX={API_PREFIX}
								setUser={populateUser}
							/>
						</div>
					}
				/>
				<Route
					path="/folders/:folderName/:dividerName"
					element={
						<div>
							<Folder
								API_PREFIX={API_PREFIX}
								user={user}
								setUser={populateUser}
							/>
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

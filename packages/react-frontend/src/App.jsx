import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Task from './pages/Task';
import Folder from './pages/Folder';

const API_PREFIX = 'http://localhost:8000';

function App() {
	const INVALID_TOKEN = 'INVALID_TOKEN';
	const [token, setToken] = useState(INVALID_TOKEN);

	const handleLoginAndRegister = (newToken, callback) => {
		setToken(newToken);
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
								token={token}
								INVALID_TOKEN={INVALID_TOKEN}
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
								handleLoginAndRegister={handleLoginAndRegister}
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
								handleLoginAndRegister={handleLoginAndRegister}
							/>
						</div>
					}
				/>
				<Route
					path="/tasks"
					element={
						<div className="d-flex">
							<Task
								API_PREFIX={API_PREFIX}
								token={token}
								INVALID_TOKEN={INVALID_TOKEN}
							/>
						</div>
					}
				/>
				<Route
					path="/folder"
					element={
						<div>
							<Folder
								API_PREFIX={API_PREFIX}
								token={token}
								INVALID_TOKEN={INVALID_TOKEN}
							/>
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Task from './components/Task';

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
							<Login
								API_PREFIX={API_PREFIX}
								handleLoginAndRegister={handleLoginAndRegister}
							/>
						</div>
					}
				/>
				<Route
					path="/register"
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
					path="/home"
					element={
						<div>
							<Sidebar />
							<Home />
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
			</Routes>
		</BrowserRouter>
	);
}

export default App;

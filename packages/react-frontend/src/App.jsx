import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import HomePage from './HomePage';
import Register from './Register';
import Login from './Login';
import Task from './Task';

const API_PREFIX = 'http://localhost:8000';

function App() {
	const INVALID_TOKEN = 'INVALID_TOKEN';
	const [token, setToken] = useState(INVALID_TOKEN);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<div>
							<Login
								API_PREFIX={API_PREFIX}
								setToken={setToken}
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
								setToken={setToken}
							/>
						</div>
					}
				/>
				<Route
					path="/home"
					element={
						<div>
							<Sidebar />
							<HomePage />
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

// src/MyApp.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Table from './Table';
import Form from './Form';
import Login from './Login';

const API_PREFIX = 'http://localhost:8000';

function MyApp() {
	const [tasks, setTasks] = useState([]);

	const INVALID_TOKEN = 'INVALID_TOKEN';
	const [token, setToken] = useState(INVALID_TOKEN);
	const [message, setMessage] = useState('');

	useEffect(() => {
		fetchTasks()
			.then((res) => (res.status === 200 ? res.json() : undefined))
			.then((json) => {
				if (json) {
					setTasks(json);
				} else {
					setTasks(null);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function updateTask(task) {
		postTask(task)
			.then((res) => {
				if (res.status === 201) {
					return res.json();
				}
			})
			.then((json) => {
				if (json) {
					setTasks([...tasks, json]);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function removeOneTask(index) {
		const idToDelete = tasks[index]._id;
		deleteTask(idToDelete)
			.then((res) => {
				if (res.status === 204) {
					const updated = tasks.filter(
						(character) => character['_id'] !== idToDelete,
					);
					setTasks(updated);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function fetchTasks() {
		const promise = fetch(`${API_PREFIX}/tasks`, {
			headers: addAuthHeader(),
		});

		return promise;
	}

	function postTask(task) {
		const promise = fetch(`${API_PREFIX}/tasks`, {
			method: 'POST',
			headers: addAuthHeader({
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(task),
		});

		return promise;
	}

	function deleteTask(id) {
		const promise = fetch(`${API_PREFIX}/tasks/${id}`, {
			method: 'DELETE',
			headers: addAuthHeader({
				'Content-Type': 'application/json',
			}),
		});

		return promise;
	}

	function addAuthHeader(otherHeaders = {}) {
		if (token === INVALID_TOKEN) {
			return otherHeaders;
		} else {
			return {
				...otherHeaders,
				Authorization: `Bearer ${token}`,
			};
		}
	}

	function loginUser(creds) {
		const promise = fetch(`${API_PREFIX}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(creds),
		})
			.then((response) => {
				if (response.status === 200) {
					response.json().then((payload) => setToken(payload.token));
					setMessage(`Login successful; auth token saved`);
				} else {
					response
						.text()
						.then((text) =>
							setMessage(
								`Login Error ${response.status}: ${text}`,
							),
						);
				}
			})
			.catch((error) => {
				setMessage(`Login Error: ${error}`);
			});

		return promise;
	}

	function registerUser(creds) {
		const promise = fetch(`${API_PREFIX}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(creds),
		})
			.then((response) => {
				if (response.status === 201) {
					response.json().then((payload) => setToken(payload.token));
					setMessage(
						`Signup successful for user: ${creds.username}; auth token saved`,
					);
				} else {
					response
						.text()
						.then((text) =>
							setMessage(
								`Signup Error ${response.status}: ${text}`,
							),
						);
				}
			})
			.catch((error) => {
				setMessage(`Signup Error: ${error}`);
			});

		return promise;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="*"
					element={
						<div className="container">
							<Login handleSubmit={loginUser} />
							<p>
								<strong>{message}</strong>
							</p>
						</div>
					}
				/>
				<Route
					path="/register"
					element={
						<div className="container">
							<Login
								handleSubmit={registerUser}
								buttonLabel="Sign Up"
							/>
							<p>
								<strong>{message}</strong>
							</p>
						</div>
					}
				/>
				<Route
					path="tasks"
					element={
						<div className="container">
							<Table
								taskData={tasks}
								removeTask={removeOneTask}
							/>
							<Form handleSubmit={updateTask} />
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default MyApp;

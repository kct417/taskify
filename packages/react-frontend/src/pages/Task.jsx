import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Table from '../components/TaskTable';
// import Form from '../components/TaskList';

//TASK BACKEND PAGE

const Task = ({ API_PREFIX, token, INVALID_TOKEN }) => {
	const [tasks, setTasks] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (token === INVALID_TOKEN) {
			navigate('/');
			return;
		}

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		return {
			...otherHeaders,
			Authorization: `Bearer ${token}`,
		};
	}

	return (
		<div className="container">
			<Table taskData={tasks} removeTask={removeOneTask} />
			{/* <Form handleSubmit={updateTask} /> */}
		</div>
	);
};

Task.propTypes = {
	API_PREFIX: PropTypes.string.isRequired,
	token: PropTypes.string.isRequired,
	INVALID_TOKEN: PropTypes.string.isRequired,
};

export default Task;

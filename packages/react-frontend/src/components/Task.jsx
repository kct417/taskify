// src/MyApp.jsx
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

function Task(props) {
	const [tasks, setTasks] = useState([]);

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
		const promise = fetch(`${props.API_PREFIX}/tasks`, {
			headers: addAuthHeader(),
		});

		return promise;
	}

	function postTask(task) {
		const promise = fetch(`${props.API_PREFIX}/tasks`, {
			method: 'POST',
			headers: addAuthHeader({
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify(task),
		});

		return promise;
	}

	function deleteTask(id) {
		const promise = fetch(`${props.API_PREFIX}/tasks/${id}`, {
			method: 'DELETE',
			headers: addAuthHeader({
				'Content-Type': 'application/json',
			}),
		});

		return promise;
	}

	function addAuthHeader(otherHeaders = {}) {
		if (props.token === props.INVALID_TOKEN) {
			return otherHeaders;
		} else {
			return {
				...otherHeaders,
				Authorization: `Bearer ${props.token}`,
			};
		}
	}

	return (
		<div className="container">
			<Table taskData={tasks} removeTask={removeOneTask} />
			<Form handleSubmit={updateTask} />
		</div>
	);
}

Task.propTypes = {
	API_PREFIX: PropTypes.string,
	token: PropTypes.string,
	INVALID_TOKEN: PropTypes.string,
};

export default Task;

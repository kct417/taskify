import TaskList from './TaskList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DefHome = ({ API_PREFIX, token, INVALID_TOKEN }) => {
	const sidebarButtonColor = '#F38D8D';

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
		<div
			className="d-flex flex-column bg-light"
			style={{
				backgroundColor: '#FFF5F5',
				paddingLeft: '20px',
				flex: 1,
				paddingTop: '20px',
				paddingRight: '20px',
			}}>
			<header
				className="sticky-top bg-white mb-4 p-3 rounded"
				style={{ borderBottom: `4px solid ${sidebarButtonColor}` }}>
				<h1>Home</h1>
				<hr />
			</header>
			<main className="container-fluid">
				<div className="row">
					<div className="col-12">
						<section className="mb-5 p-3 bg-white rounded">
							<h2
								className="text-decoration-underline mb-3"
								style={{ color: sidebarButtonColor }}>
								General
							</h2>
							<TaskList
								tasks={tasks}
								// handleTaskUpdate={handleTaskUpdate}
							/>
						</section>
					</div>
					{/* <div className="col-12">
						<section className="mb-5 p-3 bg-white rounded">
							<h2
								className="text-decoration-underline mb-3"
								style={{ color: sidebarButtonColor }}>
								Top 5
							</h2>
							<TaskList
								tasks={topTasks}
								handleTaskUpdate={handleTaskUpdate}
							/>
						</section>
					</div>
					<div className="col-12">
						<section className="mb-5 p-3 bg-white rounded">
							<h2
								className="text-decoration-underline mb-3"
								style={{ color: sidebarButtonColor }}>
								Physics
							</h2>
							<TaskList
								tasks={physicsTasks}
								handleTaskUpdate={handleTaskUpdate}
							/>
						</section>
					</div> */}
				</div>
			</main>
		</div>
	);
};

export default DefHome;

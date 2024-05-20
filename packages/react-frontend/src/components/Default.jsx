import TaskList from './TaskList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DefHome = ({ API_PREFIX, token, INVALID_TOKEN }) => {
	const sidebarButtonColor = '#F38D8D';

	// const generalTasks = [
	// 	{
	// 		id: 1,
	// 		desc: 'Buy groceries',
	// 		dueDate: '2024-05-15',
	// 		completed: false,
	// 	},
	// 	{
	// 		id: 2,
	// 		desc: 'Clean the house',
	// 		dueDate: '2024-05-18',
	// 		completed: false,
	// 	},
	// ];
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

	
	// const topTasks = [
	// 	{
	// 		id: 3,
	// 		desc: 'Finish project proposal',
	// 		dueDate: '2024-05-20',
	// 		completed: false,
	// 	},
	// 	{
	// 		id: 4,
	// 		desc: 'Schedule team meeting',
	// 		dueDate: '2024-05-22',
	// 		completed: false,
	// 	},
	// ];
	// const physicsTasks = [
	// 	{
	// 		id: 5,
	// 		desc: 'Study for physics exam',
	// 		dueDate: '2024-06-01',
	// 		completed: false,
	// 	},
	// 	{
	// 		id: 6,
	// 		desc: 'Complete physics lab report',
	// 		dueDate: '2024-06-05',
	// 		completed: false,
	// 	},
	// ];

	// const handleTaskUpdate = (taskId, newCompletedStatus) => {
	// 	console.log(
	// 		`Task ${taskId} completed status updated to ${newCompletedStatus}`,
	// 	);
	// };

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

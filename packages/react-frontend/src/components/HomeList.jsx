import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TaskList from './TaskList';

const HomeList = ({ API_PREFIX, token, INVALID_TOKEN, username }) => {
	const [tasks, setTasks] = useState([]);
	const sidebarButtonColor = '#F38D8D';
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				// Fetch user data'
				const userResponse = await fetch(`${API_PREFIX}/${username}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (userResponse.status === 401) {
					navigate('/login');
					return;
				}

				const userData = await userResponse.json();

				// Extract all tasks
				const allTasks = [];
				userData.dividers.forEach((divider) => {
					divider.folders.forEach((folder) => {
						folder.tasks.forEach((task) => {
							allTasks.push(task);
						});
					});
				});

				setTasks(allTasks);
			} catch (error) {
				console.error('Error fetching tasks:', error);
			}
		};

		fetchTasks();
	}, [API_PREFIX, token, navigate, INVALID_TOKEN, username]);

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

HomeList.propTypes = {
	API_PREFIX: PropTypes.string.isRequired,
	token: PropTypes.string.isRequired,
	INVALID_TOKEN: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
};

export default HomeList;

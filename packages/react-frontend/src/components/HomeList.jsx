import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TaskList from './TaskList';

const HomeList = ({ API_PREFIX, token, INVALID_TOKEN, username }) => {
	//const [general_tasks, setGeneralTasks] = useState([]);
	const [topTasks, setTopTasks] = useState([]);
	const [dividers, setDividers] = useState([]);
	const sidebarButtonColor = '#F38D8D';
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				if (token === INVALID_TOKEN) {
					navigate('/login');
					return;
				}

				// Fetch user data'
				const userResponse = await fetch(`${API_PREFIX}/${username}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const userData = await userResponse.json();

				// Extract all tasks
				//const allTasks = [];

				userData.dividers.forEach((divider) => {
					divider.folders.sort((a, b) => {
						if (a.folderName === 'General') return -1;
						if (b.folderName === 'General') return 1;
						return 0;
					});
				});

				setDividers(userData.dividers);

				// userData.dividers.forEach((divider) => {
				// 	divider.folders.forEach((folder) => {
				// 		folder.tasks.forEach((task) => {
				// 			allTasks.push(task);
				// 		});
				// 	});
				// });

				//setGeneralTasks(allTasks);

				// Extract and sort tasks by due date
				const allTasks = userData.dividers.flatMap((divider) =>
					divider.folders.flatMap((folder) =>
						folder.tasks.map((task) => ({
							...task,
							folderName: folder.folderName,
						})),
					),
				);

				const sortedTasks = allTasks
					.filter((task) => task.dueDate)
					.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
					.slice(0, 5);

				setTopTasks(sortedTasks);
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
						<section className="mb-5 p-3 bg-white shadow-sm rounded">
							<h2>Top 5</h2>
							<TaskList tasks={topTasks} />
						</section>
					</div>
					{dividers.map((divider) =>
						divider.folders.map((folder) => (
							<div className="col-12" key={folder._id}>
								<section className="mb-5 p-3 bg-white shadow-sm rounded">
									<h2>{folder.folderName}</h2>
									<TaskList tasks={folder.tasks} />
								</section>
							</div>
						)),
					)}
				</div>
			</main>
			{/* <main className="container-fluid">
				<div className="row">
					<div className="col-12">
						<section className="mb-5 p-3 bg-white rounded">
							<h2
								className="text-decoration-underline mb-3"
								style={{ color: sidebarButtonColor }}>
								General
							</h2>
							<TaskList
								tasks={general_tasks}
								// handleTaskUpdate={handleTaskUpdate}
							/>
						</section>
					</div>
					<div className="col-12">
						<section className="mb-5 p-3 bg-white rounded">
							<h2
								className="text-decoration-underline mb-3"
								style={{ color: sidebarButtonColor }}>
								Top 5
							</h2>
							<TaskList
								tasks={}
								// handleTaskUpdate={handleTaskUpdate}
							/>
						</section>
					</div>
					
					
				</div>
			</main> */}
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

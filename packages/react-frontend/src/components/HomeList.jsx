import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TaskList from './TaskList';

const HomeList = ({ API_PREFIX, user, updateUserData }) => {
	const [topTasks, setTopTasks] = useState([]);

	const sidebarButtonColor = '#F38D8D';
	const navigate = useNavigate();

	const fetchTasks = async () => {
		try {
			if (user.token === 'INVALID_TOKEN') {
				navigate('/login');
				return;
			}

			const allTasks = await user.dividers.flatMap((divider) =>
				divider.folders.flatMap((folder) =>
					folder.tasks.map((task) => ({
						...task,
						folderName: folder.folderName,
						dividerName: divider.dividerName,
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

	useEffect(() => {
		fetchTasks();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [API_PREFIX, user, updateUserData]);

	const deleteTask = async (task, dividerName, folderName) => {
		console.log(task, dividerName, folderName);
		try {
			const response = await fetch(
				`${API_PREFIX}/${user.username}/${dividerName}/${folderName}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ task: task }),
				},
			);
			if (response.ok) {
				// Refresh tasks after deletion
				const updatedUserResponse = await fetch(
					`${API_PREFIX}/${user.username}`,
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					},
				);
				const updatedUserData = await updatedUserResponse.json();
				updateUserData(user.token, user.username, updatedUserData);
			} else {
				console.error('Failed to delete task');
			}
		} catch (error) {
			console.error('Error deleting task:', error);
		}
	};

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
							{topTasks.map((task) => (
								<TaskList
									key={task._id}
									tasks={[task]}
									onDelete={deleteTask}
									dividerName={task.dividerName}
									folderName={task.folderName}
								/>
							))}
						</section>
					</div>
					{user.dividers.map((divider) =>
						divider.folders.map((folder) => (
							<div className="col-12" key={folder._id}>
								<section className="mb-5 p-3 bg-white shadow-sm rounded">
									<h2>
										<button
											onClick={() =>
												navigate(
													`/folders/${folder.folderName}/${divider.dividerName}`,
													{
														state: {
															folderName:
																folder.folderName,
															dividerName:
																folder.dividerName,
														},
													},
												)
											}>
											<strong>
												{folder.folderName}{' '}
											</strong>
										</button>
										{' - '}
										{divider.dividerName}
									</h2>
									<TaskList
										tasks={folder.tasks}
										onDelete={deleteTask}
										dividerName={divider.dividerName}
										folderName={folder.folderName}
									/>
								</section>
							</div>
						)),
					)}
				</div>
			</main>
		</div>
	);
};

HomeList.propTypes = {
	API_PREFIX: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	updateUserData: PropTypes.func.isRequired,
};

export default HomeList;

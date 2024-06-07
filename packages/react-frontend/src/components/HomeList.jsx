import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import fire_asset from '../assets/fire_asset.png';
import { TASKIFY_THEME_COLOR, API_PREFIX } from '../constants';

import TaskList from './TaskList';

const HomeList = ({ user, updateUser, showBanner }) => {
	const [topTasks, setTopTasks] = useState([]);

	const navigate = useNavigate();

	const fetchTasks = async () => {
		try {
			if (user.token === 'INVALID_TOKEN') {
				navigate('/');
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
			showBanner(
				'Oh no!',
				'There was an error loading the tasks.',
				'error',
			);
		}
	};

	useEffect(() => {
		fetchTasks();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, updateUser]);

	const deleteTask = async (task, dividerName, folderName) => {
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
				updateUser(
					user.token,
					user.username,
					user.streak + 1,
					updatedUserData,
				);
			} else {
				console.error('Failed to delete task');
				showBanner('Oop!', 'Task deletion failed.', 'error');
			}
		} catch (error) {
			console.error('Error deleting task:', error);
			showBanner(
				'Ahh!',
				'There was an error deleting the task.',
				'danger',
			);
		}
	};

	return (
		<div
			className="d-flex flex-column bg-light"
			style={{
				backgroundColor: TASKIFY_THEME_COLOR,
				paddingLeft: '20px',
				flex: 1,
				paddingTop: '20px',
				paddingRight: '20px',
			}}>
			<header
				className="sticky-top bg-white mb-4 p-3 rounded"
				style={{
					borderBottom: `4px solid ${TASKIFY_THEME_COLOR}`,
					zIndex: 1,
				}}>
				<div className="d-flex justify-content-between align-items-center">
					<h1>Home</h1>
					<div className="d-flex align-items-center">
						<div className="position-relative">
							<img
								src={fire_asset}
								className="img-fluid"
								style={{ width: '50px', height: '50px' }}
								alt="Fire"
							/>
							<figcaption
								className="position-absolute"
								style={{
									top: '35%',
									left: '30%',
									color: 'black',
									fontSize: '1.25em',
								}}>
								{user.streak}
							</figcaption>
						</div>
					</div>
				</div>
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
										{divider.dividerName}
										<span
											style={{
												color: '#FFFFFF',
											}}>
											{' / '}
											{folder.folderName}
										</span>
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
	user: PropTypes.object.isRequired,
	updateUser: PropTypes.func.isRequired,
	showBanner: PropTypes.func.isRequired,
};

export default HomeList;

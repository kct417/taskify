import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import TaskList from './TaskList';
import fire_asset from '../assets/fire_asset.png';
import { TASKIFY_THEME_COLOR, API_PREFIX } from '../constants';

const FolderList = ({
	user,
	updateUser,
	showBanner,
	dividerName,
	folderName,
}) => {
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);
	// const [description, setDescription] = useState('');

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				if (user.token === 'INVALID_TOKEN') {
					navigate('/');
					return;
				}

				const divider = user.dividers.map(
					(divider) => divider.dividerName === dividerName,
				);

				const folder = divider.folders.map(
					(folder) => folder.folderName === folderName,
				);

				setTasks(folder.tasks);
			} catch (error) {
				console.error('Error fetching tasks:', error);
				showBanner(
					'Ahh!',
					'There was an error getting your tasks.',
					'danger',
				);
			}
		};

		fetchTasks();
	}, [user, folderName, dividerName, navigate, showBanner]);

	const deleteTask = async (task) => {
		try {
			const response = await fetch(
				`${API_PREFIX}/${user.username}/${dividerName}/${folderName}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ task }),
				},
			);
			//Update streak count for task deleted
			if (response.ok) {
				setTasks((prevTasks) =>
					prevTasks.filter((t) => t._id !== task._id),
				);

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
				showBanner(
					'Oops!',
					'There was an issue removing the task.',
					'danger',
				);
			}
		} catch (error) {
			console.error('Error in deleting task:', error);
			showBanner(
				'Yikes!',
				'There was an issue deleting the task.',
				'danger',
			);
		}
	};

	//Sort tasks in sections based on date
	const isToday = (date) => {
		const today = new Date();
		const taskDate = new Date(date);

		today.setDate(today.getDate() - 1);
		today.setHours(0, 0, 0, 0);

		taskDate.setHours(0, 0, 0, 0);

		return today.getTime() === taskDate.getTime();
	};

	const isFuture = (date) => {
		const today = new Date();
		const taskDate = new Date(date);

		today.setDate(today.getDate() - 1);
		today.setHours(0, 0, 0, 0);

		taskDate.setHours(0, 0, 0, 0);

		return today.getTime() < taskDate.getTime();
	};

	const isPast = (date) => {
		const today = new Date();
		const taskDate = new Date(date);

		today.setDate(today.getDate() - 1);
		today.setHours(0, 0, 0, 0);

		taskDate.setHours(0, 0, 0, 0);

		return today.getTime() > taskDate.getTime();
	};

	return (
		<div
			className="container-fluid bg-light p-3"
			style={{ backgroundColor: TASKIFY_THEME_COLOR, height: '100vh' }}>
			<header
				className="sticky-top bg-white mb-4 p-3 rounded"
				style={{
					borderBottom: `4px solid ${TASKIFY_THEME_COLOR}`,
					zIndex: 1,
				}}>
				<div className="d-flex justify-content-between align-items-center">
					<h1>
						{dividerName}
						{' / '}
						<span style={{ color: TASKIFY_THEME_COLOR }}>
							{folderName}
						</span>
					</h1>
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
					<div className="col-12 mb-4">
						<section className="p-3 bg-white rounded">
							<h2 style={{ color: TASKIFY_THEME_COLOR }}>
								Today
							</h2>
							<TaskList
								tasks={tasks.filter((task) =>
									isToday(task.dueDate),
								)}
								onDelete={deleteTask}
							/>
						</section>
					</div>
					<div className="col-12 mb-4">
						<section className="p-3 bg-white rounded">
							<h2 style={{ color: TASKIFY_THEME_COLOR }}>
								Upcoming
							</h2>
							<TaskList
								tasks={tasks.filter((task) =>
									isFuture(task.dueDate),
								)}
								onDelete={deleteTask}
							/>
						</section>
					</div>
					<div className="col-12 mb-4">
						<section className="p-3 bg-white rounded">
							<h2 style={{ color: TASKIFY_THEME_COLOR }}>Past</h2>
							<TaskList
								tasks={tasks.filter((task) =>
									isPast(task.dueDate),
								)}
								onDelete={deleteTask}
							/>
						</section>
					</div>
					<div className="col-12">
						<section className="p-3 bg-white rounded">
							<h2 style={{ color: TASKIFY_THEME_COLOR }}>
								No Due Date
							</h2>
							<TaskList
								tasks={tasks.filter(
									(task) =>
										!isPast(task.dueDate) &&
										!isFuture(task.dueDate) &&
										!isToday(task.dueDate),
								)}
								onDelete={deleteTask}
							/>
						</section>
					</div>
				</div>
			</main>
		</div>
	);
};

FolderList.propTypes = {
	user: PropTypes.object.isRequired,
	updateUser: PropTypes.func.isRequired,
	showBanner: PropTypes.func.isRequired,
	dividerName: PropTypes.string,
	folderName: PropTypes.string,
};

export default FolderList;

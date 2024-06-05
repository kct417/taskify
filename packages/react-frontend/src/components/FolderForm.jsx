import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import TaskList from './TaskList';
import fire_asset from '../assets/fire_asset.png';

const FolderForm = ({ API_PREFIX, user, updateUserData }) => {
	const { folderName, dividerName } = useParams();
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);
	const [description, setDescription] = useState('');
	const [streakCount, setStreakCount] = useState(0);
	const sidebarButtonColor = '#F38D8D';

	const fetchTasks = async () => {
		try {
			if (user.token === 'INVALID_TOKEN') {
				navigate('/login');
				return;
			}

			const folderTasks = user.dividers.flatMap((divider) =>
				divider.folders
					.filter((folder) => folder.folderName === folderName)
					.flatMap((folder) => folder.tasks),
			);

			setTasks(folderTasks);
		} catch (error) {
			console.error('Error fetching tasks:', error);
		}
	};

	const fetchUserStreakCount = async () => {
		try {
			const response = await fetch(
				`${API_PREFIX}/${user.username}/streak`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				},
			);
			const data = await response.json();
			setStreakCount(data.streakCount);
		} catch (error) {
			console.error('Error fetching streak count:', error);
		}
	};

	useEffect(() => {
		const savedDescription = localStorage.getItem(
			`description-${folderName}`,
		);
		if (savedDescription) {
			setDescription(savedDescription);
		}
		fetchTasks();
		fetchUserStreakCount();
	}, [API_PREFIX, user, folderName]);

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
				const newStreakCount = streakCount + 1;
				setStreakCount(newStreakCount);
				await fetch(`${API_PREFIX}/${user.username}/streak`, {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({ streakCount: newStreakCount }),
				});

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
				updateUserData(user.token, user.username, updatedUserData);
			} else {
				console.error('Failed to delete task');
			}
		} catch (error) {
			console.error('Error in deleting task:', error);
		}
	};

	const handleDescriptionChange = (event) => {
		const newDescription = event.target.value;
		setDescription(newDescription);
		localStorage.setItem(`description-${folderName}`, newDescription);
	};

	//Reset to 0
	const resetStreakCount = async () => {
		try {
			setStreakCount(0);
			await fetch(`${API_PREFIX}/${user.username}/streak`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({ streakCount: 0 }),
			});
		} catch (error) {
			console.error('Error resetting streak count:', error);
		}
	};
	//Sort tasks in sections based on date
	const isToday = (date) => {
		const today = new Date();
		const taskDate = new Date(date);

		today.setHours(0, 0, 0, 0);
		taskDate.setHours(0, 0, 0, 0);

		return today.getTime() === taskDate.getTime();
	};

	const isFuture = (date) => {
		const today = new Date();
		const taskDate = new Date(date);

		today.setHours(0, 0, 0, 0);
		taskDate.setHours(0, 0, 0, 0);

		return today.getTime() < taskDate.getTime();
	};

	const isPast = (date) => {
		const today = new Date();
		const taskDate = new Date(date);

		today.setHours(0, 0, 0, 0);
		taskDate.setHours(0, 0, 0, 0);

		return today.getTime() > taskDate.getTime();
	};

	return (
		<div
			className="container-fluid bg-light p-3"
			style={{ backgroundColor: '#FFF5F5', height: '100vh' }}>
			<header
				className="sticky-top bg-white mb-4 p-3 rounded"
				style={{ borderBottom: `4px solid ${sidebarButtonColor}` }}>
				<div className="d-flex justify-content-between align-items-center">
					<h1>
						{folderName} - {dividerName}
					</h1>
					<div className="d-flex align-items-center">
						<button
							onClick={resetStreakCount}
							className="btn btn-danger mr-2">
							Reset Streak
						</button>
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
								{streakCount}
							</figcaption>
						</div>
					</div>
				</div>
				<h5 className="mt-3">
					Description:
					<input
						type="text"
						value={description}
						onChange={handleDescriptionChange}
						placeholder="Type folder description here..."
						className="form-control mt-2"
					/>
				</h5>
				<hr />
			</header>
			<main className="container-fluid">
				<div className="row">
					<div className="col-12 mb-4">
						<section className="p-3 bg-white rounded">
							<h2 style={{ color: sidebarButtonColor }}>Today</h2>
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
							<h2 style={{ color: sidebarButtonColor }}>
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
					<div className="col-12">
						<section className="p-3 bg-white rounded">
							<h2 style={{ color: sidebarButtonColor }}>Past</h2>
							<TaskList
								tasks={tasks.filter((task) =>
									isPast(task.dueDate),
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

FolderForm.propTypes = {
	API_PREFIX: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	updateUserData: PropTypes.func.isRequired,
};

export default FolderForm;

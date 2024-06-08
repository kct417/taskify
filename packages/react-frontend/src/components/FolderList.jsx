import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import TaskList from './TaskList';
import { TASKIFY_THEME_COLOR } from '../constants';
import { deleteTask } from '../delete';
import ListHeader from './ListHeader';

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

	const removeTaskFromFolder = (task) =>
		deleteTask(task, user, dividerName, folderName, updateUser, showBanner);

	const fetchFolderTasks = async () => {
		try {
			if (user.token === 'INVALID_TOKEN') {
				navigate('/');
				return;
			}
			const divider = user.dividers.find(
				(divider) => divider.dividerName === dividerName,
			);

			const folder = divider.folders.find(
				(folder) => folder.folderName === folderName,
			);
			if (folder) {
				setTasks(folder.tasks);
			}
		} catch (error) {
			console.error('Error fetching tasks:', error);
			showBanner(
				'Ahh!',
				'There was an error getting your tasks.',
				'danger',
			);
		}
	};

	useEffect(() => {
		fetchFolderTasks();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, folderName, dividerName]);

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

	const headerTitle = (
		<h1>
			{dividerName}
			{' / '}
			<span style={{ color: TASKIFY_THEME_COLOR }}>{folderName}</span>
		</h1>
	);

	const ListWrapper = ({ children }) => {
		return (
			<div className="col-12 mb-4">
				<section className="p-3 bg-white rounded">
					{...children}
				</section>
			</div>
		);
	};

	return (
		<div
			className="container-fluid bg-light p-3"
			style={{ backgroundColor: TASKIFY_THEME_COLOR, height: '100vh' }}>
			<ListHeader title={headerTitle} streak={user.streak} />
			<main className="container-fluid">
				<div className="row">
					<ListWrapper>
						<h2 style={{ color: TASKIFY_THEME_COLOR }}>Today</h2>
						<TaskList
							tasks={tasks.filter((task) =>
								isToday(task.dueDate),
							)}
							deleteFromList={removeTaskFromFolder}
						/>
					</ListWrapper>
					<ListWrapper>
						<h2 style={{ color: TASKIFY_THEME_COLOR }}>Upcoming</h2>
						<TaskList
							tasks={tasks.filter((task) =>
								isFuture(task.dueDate),
							)}
							deleteFromList={removeTaskFromFolder}
						/>
					</ListWrapper>
					<ListWrapper>
						<h2 style={{ color: TASKIFY_THEME_COLOR }}>Past</h2>
						<TaskList
							tasks={tasks.filter((task) => isPast(task.dueDate))}
							deleteFromList={removeTaskFromFolder}
						/>
					</ListWrapper>
					<ListWrapper>
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
							deleteFromList={removeTaskFromFolder}
						/>
					</ListWrapper>
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

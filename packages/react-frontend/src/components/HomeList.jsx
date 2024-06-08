import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { TASKIFY_THEME_COLOR } from '../constants';
import { deleteTask } from '../delete';

import ListHeader from './ListHeader';
import TaskList from './TaskList';
import Task from './Task';

const HomeList = ({ user, updateUser, showBanner }) => {
	HomeList.propTypes = {
		user: PropTypes.object.isRequired,
		updateUser: PropTypes.func.isRequired,
		showBanner: PropTypes.func.isRequired,
	};

	const [topTasks, setTopTasks] = useState([]);

	const navigate = useNavigate();

	const fetchAllTasks = async () => {
		try {
			if (user.token === 'INVALID_TOKEN') {
				navigate('/');
				return;
			}

			const allTasks = await user.dividers.flatMap((divider) =>
				divider.folders.flatMap((folder) =>
					folder.tasks.map((task) => ({
						task,
						folderName: folder.folderName,
						dividerName: divider.dividerName,
					})),
				),
			);

			// gets top 5 earliest tasks
			const sortedTasks = allTasks
				.filter((wrappedTask) => wrappedTask.task.dueDate)
				.sort(
					(wt1, wt2) =>
						new Date(wt1.task.dueDate) - new Date(wt2.task.dueDate),
				)
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
		fetchAllTasks();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, updateUser]);

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
			<ListHeader title={<h1>Home</h1>} streak={user.streak} />
			<main className="container-fluid">
				<div className="row">
					<div className="col-12">
						<section className="mb-5 p-3 bg-white shadow-sm rounded">
							<h2>Top 5</h2>
							{topTasks.map((wrappedTask) => {
								const { task, dividerName, folderName } =
									wrappedTask;
								return (
									<Task
										key={task._id}
										task={task}
										deleteSelf={() => {
											deleteTask(
												task,
												user,
												dividerName,
												folderName,
												updateUser,
												showBanner,
											);
										}}
									/>
								);
							})}
						</section>
					</div>
					{user.dividers.map((divider) =>
						divider.folders.map((folder) => (
							<div className="col-12" key={folder._id}>
								<section className="mb-5 p-3 bg-white shadow-sm rounded">
									<h2>
										{divider.dividerName}
										{' / '}
										<span
											style={{
												color: TASKIFY_THEME_COLOR,
											}}>
											{folder.folderName}
										</span>
									</h2>
									<TaskList
										tasks={folder.tasks}
										deleteFromList={(task) => {
											deleteTask(
												task,
												user,
												divider.dividerName,
												folder.folderName,
												updateUser,
												showBanner,
											);
										}}
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

export default HomeList;

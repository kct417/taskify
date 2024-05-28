import React from 'react';
import TaskList from './TaskList';
import fire_asset from '../assets/fire_asset.png';
import './header.css';

import { Container } from 'react-bootstrap';

const FolderForm = () => {
	const sidebarButtonColor = '#F38D8D';

	const physicsTasks = [
		{
			id: 1,
			desc: 'Study for physics exam',
			dueDate: '2024-06-01',
			completed: false,
		},
		{
			id: 2,
			desc: 'Complete physics lab report',
			dueDate: '2024-06-05',
			completed: false,
		},
	];
	const emptyTasks = [
		{
			id: 0,
			desc: 'Add New Task',
			dueDate: '',
			completed: false,
		},
		{
			id: 1,
			desc: 'Add New Task',
			dueDate: '',
			completed: false,
		},
		{
			id: 2,
			desc: 'Add New Task',
			dueDate: '',
			completed: false,
		},
	];

	const handleTaskUpdate = (taskId, newCompletedStatus) => {
		console.log(
			`Task ${taskId} completed status updated to ${newCompletedStatus}`,
		);
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
				<div className="container">
					<h3>Physics</h3>
					<Container>
						<figure className="position-relative">
							<img
								src={fire_asset}
								className="fire_img"
								alt="Fire"
							/>
							<figcaption>1</figcaption>
						</figure>
					</Container>
				</div>
				<h5>
					Description:
					<input type="text" className="textarea" />
				</h5>
				<hr />
			</header>
			<main className="container-fluid">
				<div className="row">
					<div className="col-12">
						<section className="mb-5 p-3 bg-white rounded">
							<h2 style={{ color: sidebarButtonColor }}>Today</h2>
							<TaskList
								tasks={physicsTasks}
								handleTaskUpdate={handleTaskUpdate}
							/>
						</section>
					</div>
					<hr />
					<div className="col-12">
						<section className="mb-5 p-3 bg-white rounded">
							<h2 style={{ color: sidebarButtonColor }}>
								Upcoming
							</h2>
							<TaskList
								tasks={emptyTasks}
								handleTaskUpdate={handleTaskUpdate}
							/>
						</section>
					</div>
				</div>
			</main>
		</div>
	);
};

export default FolderForm;
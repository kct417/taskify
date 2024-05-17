import React from 'react';
import TaskList from './TaskList';
import fire_asset from '../assets/fire_asset.png';

const Folder_Form = () => {
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
				<h1>Physics <img src={fire_asset} alt="Fire" /></h1>
				<h5>Description: </h5>
				<hr />
			</header>
			<main className="container-fluid">
				<div className="row">
					<div className="col-12">
						<section className="mb-5 p-3 bg-white rounded">
							<h2
								className="text-decoration-underline mb-3"
								style={{ color: sidebarButtonColor }}>
								Today
							</h2>
							<TaskList
								tasks={physicsTasks}
								handleTaskUpdate={handleTaskUpdate}
							/>
						</section>
					</div>
					<div className="col-12">
						<section className="mb-5 p-3 bg-white rounded">
							<h2
								className="text-decoration-underline mb-3"
								style={{ color: sidebarButtonColor }}>
								Upcoming
							</h2>
							<TaskList
								tasks={physicsTasks}
								handleTaskUpdate={handleTaskUpdate}
							/>
						</section>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Folder_Form;

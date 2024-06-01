import TaskList from './TaskList';
import fire_asset from '../assets/fire_asset.png';

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
			className="container-fluid bg-light p-3"
			style={{ backgroundColor: '#FFF5F5', height: '100vh' }}>
			<header
				className="sticky-top bg-white mb-4 p-3 rounded"
				style={{ borderBottom: `4px solid ${sidebarButtonColor}` }}>
				<div className="d-flex justify-content-between align-items-center">
					<h3>Physics</h3>
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
								left: '40%',
								color: 'black',
								fontSize: '1.25em',
							}}>
							1
						</figcaption>
					</div>
				</div>
				<h5 className="mt-3">
					Description:
					<input type="text" className="form-control mt-2" />
				</h5>
				<hr />
			</header>
			<main className="container-fluid">
				<div className="row">
					<div className="col-12 mb-4">
						<section className="p-3 bg-white rounded">
							<h2 style={{ color: sidebarButtonColor }}>Today</h2>
							<TaskList
								tasks={physicsTasks}
								handleTaskUpdate={handleTaskUpdate}
							/>
						</section>
					</div>
					<div className="col-12">
						<section className="p-3 bg-white rounded">
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

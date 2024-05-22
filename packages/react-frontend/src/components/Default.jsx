import TaskList from './TaskList';

const DefHome = () => {
	const sidebarButtonColor = '#F38D8D';

	const generalTasks = [
		{
			id: 1,
			desc: 'Buy groceries',
			dueDate: '2024-05-15',
			completed: false,
		},
		{
			id: 2,
			desc: 'Clean the house',
			dueDate: '2024-05-18',
			completed: false,
		},
	];
	const topTasks = [
		{
			id: 3,
			desc: 'Finish project proposal',
			dueDate: '2024-05-20',
			completed: false,
		},
		{
			id: 4,
			desc: 'Schedule team meeting',
			dueDate: '2024-05-22',
			completed: false,
		},
	];
	const physicsTasks = [
		{
			id: 5,
			desc: 'Study for physics exam',
			dueDate: '2024-06-01',
			completed: false,
		},
		{
			id: 6,
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
				<h1>Home</h1>
				<hr />
			</header>
			<main className="container-fluid">
				<div className="row">
					<div className="col-12">
						<section className="mb-5 p-3 bg-white rounded">
							<h2
								className="text-decoration-underline mb-3"
								style={{ color: sidebarButtonColor }}>
								General
							</h2>
							<TaskList
								tasks={generalTasks}
								handleTaskUpdate={handleTaskUpdate}
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
								tasks={topTasks}
								handleTaskUpdate={handleTaskUpdate}
							/>
						</section>
					</div>
					<div className="col-12">
						<section className="mb-5 p-3 bg-white rounded">
							<h2
								className="text-decoration-underline mb-3"
								style={{ color: sidebarButtonColor }}>
								Physics
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

export default DefHome;

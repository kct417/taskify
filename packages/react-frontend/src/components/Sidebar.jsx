const Sidebar = () => {
	return (
		<div
			className="d-flex flex-column"
			style={{
				backgroundColor: '#D2C0C0',
				width: '200px',
				height: '100vh',
			}}>
			<div className="p-3">
				<button
					className="btn btn-primary rounded-pill"
					style={{
						backgroundColor: '#F38D8D',
						borderColor: '#F38D8D',
					}}>
					Home
				</button>
			</div>
			<div className="flex-grow-1 p-3 overflow-auto">
				<div className="fw-bold mb-2">Physics</div>
				<button
					className="btn btn-primary rounded-pill mb-2"
					style={{
						backgroundColor: '#F38D8D',
						borderColor: '#F38D8D',
					}}>
					Homework
				</button>
			</div>
			<div className="p-3 d-flex justify-content-left">
				<button
					className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
					style={{
						backgroundColor: '#F38D8D',
						borderColor: '#F38D8D',
						width: '50px',
						height: '50px',
					}}>
					<span className="fs-3">+</span>
				</button>
			</div>
		</div>
	);
};

export default Sidebar;

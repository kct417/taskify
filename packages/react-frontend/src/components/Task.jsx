import React, { useState } from 'react';

const Task = ({ task, dueDate, handleCheckboxChange }) => {
	const [checked, setChecked] = useState(task.completed);

	const handleCheckboxClick = () => {
		setChecked(!checked);
		handleCheckboxChange();
	};

	return (
		<div
			className="d-flex p-2 justify-content-between border rounded mb-2"
			style={{ backgroundColor: '#f7bcbc' }}>
			<div className="form-check me-2">
				<input
					type="checkbox"
					className="form-check-input"
					id={`task-${task.id}`}
					checked={checked}
					onChange={handleCheckboxClick}
				/>
			</div>
			<div className="text-center flex-grow-1 text-white">
				{task.desc}
			</div>
			<div className="text-end font-weight-bold">Due: {dueDate}</div>
		</div>
	);
};

export default Task;

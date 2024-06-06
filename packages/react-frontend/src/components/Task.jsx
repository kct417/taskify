import PropTypes from 'prop-types';
import { useState } from 'react';

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toISOString().split('T')[0];
};

const Task = ({ task, onDelete, dividerName, folderName }) => {
	const [checked, setChecked] = useState(false);

	// If a task is checked, the "checked" field is set to "true"
	// and the task is deleted
	const handleCheckboxClick = () => {
		setChecked(!checked);
		if (!checked) {
			onDelete(task, dividerName, folderName);
		}
	};

	return (
		<div
			className="d-flex p-2 justify-content-between border rounded mb-2"
			style={{ backgroundColor: '#f7bcbc' }}>
			<div className="form-check me-2">
				<input
					type="checkbox"
					className="form-check-input"
					checked={checked}
					onChange={handleCheckboxClick}
				/>
			</div>
			<div className="text-center flex-grow-1 text-white">
				{task.taskName}
			</div>
			<div className="text-end font-weight-bold">
				Due: {task.dueDate ? formatDate(task.dueDate) : 'No due date'}
			</div>
		</div>
	);
};

Task.propTypes = {
	task: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		taskName: PropTypes.string.isRequired,
		description: PropTypes.string,
		dueDate: PropTypes.string,
		completed: PropTypes.bool,
	}).isRequired,
	onDelete: PropTypes.func.isRequired,
	dividerName: PropTypes.string,
	folderName: PropTypes.string,
};

export default Task;

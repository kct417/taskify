import PropTypes from 'prop-types';
import { useState } from 'react';

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toISOString().split('T')[0];
};

const Task = ({ task }) => {
	const [checked, setChecked] = useState([]);

	// const handleCheckboxClick = () => {
	// 	setChecked(!checked);
	// 	handleCheckboxChange();
	// };

	return (
		<div
			className="d-flex p-2 justify-content-between border rounded mb-2"
			style={{ backgroundColor: '#f7bcbc' }}>
			<div className="form-check me-2">
				<input
					type="checkbox"
					className="form-check-input"
					//id={key}
					// checked={checked}
					// onChange={handleCheckboxClick}
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

	// handleCheckboxChange: PropTypes.func.isRequired,
};
export default Task;

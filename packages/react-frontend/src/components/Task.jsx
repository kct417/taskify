import PropTypes from 'prop-types';
import { useState } from 'react';

const Task = ({ task, handleCheckboxChange }) => {
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
					id={`task-${task.taskname}`}
					// checked={checked}
					// onChange={handleCheckboxClick}
				/>
			</div>
			<div className="text-center flex-grow-1 text-white">
				{task.description}
			</div>
			<div className="text-end font-weight-bold">Due: </div>
		</div>
	);
};

Task.propTypes = {
	task: PropTypes.object,
	// handleCheckboxChange: PropTypes.func.isRequired,
};

export default Task;

import PropTypes from 'prop-types';
import { useState } from 'react';
import { TASKIFY_THEME_COLOR } from '../constants';

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toISOString().split('T')[0];
};

const Task = ({ task, deleteSelf }) => {
	Task.propTypes = {
		task: PropTypes.shape({
			_id: PropTypes.string.isRequired,
			taskName: PropTypes.string.isRequired,
			description: PropTypes.string,
			dueDate: PropTypes.string,
			completed: PropTypes.bool,
		}).isRequired,
		deleteSelf: PropTypes.func.isRequired,
	};

	const [checked, setChecked] = useState(false);

	const handleCheckboxClick = () => {
		setChecked(!checked);
		if (!checked) {
			deleteSelf();
		}
	};

	const hasTaskDescription = task.description !== undefined;
	return (
		<div
			className="mb-3 text-muted"
			style={{
				border: '2px solid ' + TASKIFY_THEME_COLOR,
				borderRadius: '5px',
			}}>
			<div
				className="d-flex justify-content-start align-items-center"
				style={{ borderBottom: '1.5px solid ' + TASKIFY_THEME_COLOR }}>
				<input
					type="checkbox"
					className="m-2"
					style={{ width: '25px', height: '25px' }}
					checked={checked}
					onChange={handleCheckboxClick}
				/>
				<div className="d-flex mr-2 w-100 text-truncate justify-content-between">
					<h3 className="text-left m-0">{task.taskName}</h3>
					<h3 className="text-end m-0">
						due:{' '}
						{task.dueDate
							? formatDate(task.dueDate)
							: 'No due date'}
					</h3>
				</div>
			</div>
			{hasTaskDescription && (
				<p className="p-2 m-0">{task.description}</p>
			)}
		</div>
	);
};

export default Task;

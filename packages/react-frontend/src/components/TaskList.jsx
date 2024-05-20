import PropTypes from 'prop-types';

import Task from './Task';

const TaskList = ({ tasks }) => {
	return (
		<div>
			{tasks.map((task) => (
				<Task
					task={task}
					// handleCheckboxChange={() => {
					// 	task.completed = !task.completed;
					// 	handleTaskUpdate(task.id, task.completed);
					// }}
				/>
			))}
		</div>
	);
};

TaskList.propTypes = {
	tasks: PropTypes.arrayOf(PropTypes.object),
	// handleTaskUpdate: PropTypes.func.isRequired,
};

export default TaskList;

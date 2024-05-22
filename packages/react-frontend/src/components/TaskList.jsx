import PropTypes from 'prop-types';

import Task from './Task';

const TaskList = ({ tasks, handleTaskUpdate }) => {
	return (
		<div>
			{tasks.map((task) => (
				<Task
					key={task.id}
					task={task}
					dueDate={task.dueDate}
					handleCheckboxChange={() => {
						task.completed = !task.completed;
						handleTaskUpdate(task.id, task.completed);
					}}
				/>
			))}
		</div>
	);
};

TaskList.propTypes = {
	tasks: PropTypes.arrayOf(PropTypes.object),
	handleTaskUpdate: PropTypes.func.isRequired,
};

export default TaskList;

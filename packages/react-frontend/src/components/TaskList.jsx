import PropTypes from 'prop-types';

import Task from './Task';

const TaskList = ({ tasks, deleteFromList }) => {
	TaskList.propTypes = {
		tasks: PropTypes.array,
		deleteFromList: PropTypes.func.isRequired,
	};

	return (
		<div>
			{tasks.map((task) => (
				<Task
					key={task._id}
					task={task}
					deleteSelf={() => deleteFromList(task)}
				/>
			))}
		</div>
	);
};

export default TaskList;

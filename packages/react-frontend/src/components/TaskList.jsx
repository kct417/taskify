import PropTypes from 'prop-types';

import Task from './Task';

const TaskList = ({ tasks, deleteFromList }) => {
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

TaskList.propTypes = {
	tasks: PropTypes.array,
	deleteFromList: PropTypes.func.isRequired,
};

export default TaskList;

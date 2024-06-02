import PropTypes from 'prop-types';

import Task from './Task';

const TaskList = ({ tasks, onDelete, dividerName, folderName }) => {
	return (
		<div>
			{tasks.map((task) => (
				<Task
					key={task._id}
					task={task}
					onDelete={onDelete}
					dividerName={dividerName}
					folderName={folderName}
				/>
			))}
		</div>
	);
};

TaskList.propTypes = {
	tasks: PropTypes.array,
	onDelete: PropTypes.func.isRequired,
	dividerName: PropTypes.string,
	folderName: PropTypes.string,
};

export default TaskList;

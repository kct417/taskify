// FOR DISPLAYING TASKS IN BACKEND, NOT USED IN FRONTEND

import PropTypes from 'prop-types';

const TableHeader = () => {
	return (
		<thead>
			<tr>
				<th>TaskName</th>
				<th>Description</th>
				<th>ID</th>
			</tr>
		</thead>
	);
};

const TableBody = ({ taskData, removeTask }) => {
	if (taskData === null) {
		return <caption>Data Unavailable</caption>;
	}

	const rows = taskData.map((row, index) => {
		return (
			<tr key={index}>
				<td>{row.taskname}</td>
				<td>{row.description}</td>
				<td>{row._id}</td>
				<td>
					<button onClick={() => removeTask(index)}>Delete</button>
				</td>
			</tr>
		);
	});
	return <tbody>{rows}</tbody>;
};

const Table = ({ taskData, removeTask }) => {
	return (
		<table>
			<TableHeader />
			<TableBody taskData={taskData} removeTask={removeTask} />
		</table>
	);
};

TableBody.propTypes = {
	taskData: PropTypes.array,
	removeTask: PropTypes.func.isRequired,
};

Table.propTypes = {
	taskData: PropTypes.array,
	removeTask: PropTypes.func.isRequired,
};

export default Table;

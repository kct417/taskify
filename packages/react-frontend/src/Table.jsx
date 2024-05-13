// src/Table.jsx
import PropTypes from 'prop-types';

function TableHeader() {
	return (
		<thead>
			<tr>
				<th>TaskName</th>
				<th>Description</th>
				<th>ID</th>
			</tr>
		</thead>
	);
}

function TableBody(props) {
	if (props.taskData === null) {
		return <caption>Data Unavailable</caption>;
	}

	const rows = props.taskData.map((row, index) => {
		return (
			<tr key={index}>
				<td>{row.taskname}</td>
				<td>{row.description}</td>
				<td>{row._id}</td>
				<td>
					<button onClick={() => props.removeTask(index)}>
						Delete
					</button>
				</td>
			</tr>
		);
	});
	return <tbody>{rows}</tbody>;
}

function Table(props) {
	return (
		<table>
			<TableHeader />
			<TableBody
				taskData={props.taskData}
				removeTask={props.removeTask}
			/>
		</table>
	);
}

TableBody.propTypes = {
	taskData: PropTypes.array,
	removeTask: PropTypes.func.isRequired,
};

Table.propTypes = {
	taskData: PropTypes.array,
	removeTask: PropTypes.func.isRequired,
};

export default Table;

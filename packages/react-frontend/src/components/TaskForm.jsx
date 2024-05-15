<<<<<<< HEAD
// src/Form.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';

function Form(props) {
	const [task, setTask] = useState({
		taskname: '',
		description: '',
	});

	function handleChange(event) {
		const { name, value } = event.target;
		if (name === 'description')
			setTask({ taskname: task['taskname'], description: value });
		else
			setTask({
				taskname: value,
				description: task['description'],
			});
	}

	function submitForm() {
		props.handleSubmit(task);
		setTask({ taskname: '', description: '' });
	}

	return (
		<form>
			<label htmlFor="taskname">TaskName</label>
			<input
				type="text"
				name="taskname"
				id="taskname"
				value={task.taskname}
				onChange={handleChange}
			/>
			<label htmlFor="description">Description</label>
			<input
				type="text"
				name="description"
				id="description"
				value={task.description}
				onChange={handleChange}
			/>
			<input type="button" value="Submit" onClick={submitForm} />
		</form>
	);
}

Form.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
=======
const Form = ({ fields }) => {
	console.log(fields);
	return (
		<form className="vstack text-center">
			{fields.map(([fieldname, placeholder]) => {
				return (
					<div className="form-group text-left">
						<label>{fieldname}</label>
						<input
							type="text"
							className="form-control"
							placeholder={placeholder}
						/>
					</div>
				);
			})}
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
>>>>>>> 8f9c9f1e22fd67a89f63ce90db8fab6befda98e7
};

export default Form;

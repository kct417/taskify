import PropTypes from 'prop-types';
import { useState } from 'react';
import { TASKIFY_THEME_COLOR } from '../constants';

// Overlay component definition
const Overlay = ({
	user, // User object containing user data
	show, // Boolean to control the visibility of the overlay
	context, // Object containing context information (like title)
	fields, // Array of field objects for the form
	buttons, // Array of button objects for the form
	handleClose, // Function to handle closing the overlay
	onAddFolder, // Function to handle adding a folder
	onAddDivider, // Function to handle adding a divider
	onAddTask, // Function to handle adding a task
}) => {
	// Define prop types for the Overlay component
	Overlay.propTypes = {
		user: PropTypes.object.isRequired, // User object is required
		show: PropTypes.bool.isRequired, // Show boolean is required
		context: PropTypes.object.isRequired, // Context object is required
		fields: PropTypes.arrayOf(PropTypes.object).isRequired, // Fields array is required
		buttons: PropTypes.arrayOf(PropTypes.object).isRequired, // Buttons array is required
		handleClose: PropTypes.func.isRequired, // Handle close function is required
		onAddFolder: PropTypes.func.isRequired, // On add folder function is required
		onAddDivider: PropTypes.func.isRequired, // On add divider function is required
		onAddTask: PropTypes.func.isRequired, // On add task function is required
	};

	// State to manage form field values
	const [formFields, setFormFields] = useState({});
	// State to manage the selected divider
	const [selectedDivider, setSelectedDivider] = useState();

	// Function to handle changes in form fields
	const handleFormFieldChange = (key, value) => {
		if (key === 'divider') {
			setSelectedDivider(value); // Update selected divider if the key is 'divider'
		}

		// Update the form fields state
		setFormFields((prevFormFields) => ({
			...prevFormFields,
			[key]: value,
		}));
	};

	// Function to handle clicking the 'Add Folder' button
	const handleAddFolderClick = () => {
		onAddFolder(formFields);
	};

	// Function to handle clicking the 'Add Divider' button
	const handleAddDividerClick = () => {
		onAddDivider(formFields);
	};

	// Function to handle clicking the 'Add Task' button
	const handleAddTaskClick = () => {
		onAddTask(formFields);
	};

	// Return null if the overlay is not supposed to be shown
	if (!show) {
		return null;
	}

	// Render the overlay component
	return (
		<div
			className="modal fade show d-block"
			tabIndex="-1"
			role="dialog"
			style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 2 }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{context.title}</h5>
						<button
							type="button"
							className="close"
							aria-label="Close"
							onClick={handleClose}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						{fields.map((field, idx) => {
							const { label, placeholder, type, key, options } =
								field;
							if (type === 'dropdown') {
								let folderOptions = [];
								if (label === 'Folder' && selectedDivider) {
									const divData = user.dividers.find(
										(divider) =>
											divider.dividerName ===
											selectedDivider,
									);
									folderOptions = divData.folders.map(
										(folder) => folder.folderName,
									);
								}
								return (
									<div
										key={idx}
										className="form-group text-left">
										<label>{label}</label>
										<select
											className="form-control"
											onChange={(event) =>
												handleFormFieldChange(
													key,
													event.target.value,
												)
											}>
											<option value="">
												Select an option
											</option>
											{label === 'Folder' ? (
												folderOptions.length > 0 ? (
													folderOptions.map(
														(folder, folderIdx) => (
															<option
																key={folderIdx}
																value={folder}>
																{folder}
															</option>
														),
													)
												) : (
													<option value="" disabled>
														No folders available
													</option>
												)
											) : (
												options.map(
													(option, optionIdx) => (
														<option
															key={optionIdx}
															value={option}>
															{option}
														</option>
													),
												)
											)}
										</select>
									</div>
								);
							}
							return (
								<div key={idx} className="form-group text-left">
									<label>{label}</label>
									<input
										type={type}
										className="form-control"
										placeholder={placeholder}
										onChange={(event) =>
											handleFormFieldChange(
												key,
												event.target.value,
											)
										}
									/>
								</div>
							);
						})}
						{buttons.map((button, idx) => {
							const { label, type } = button;
							let clickFunction = button.onClick || handleClose;
							if (label === 'Add Folder') {
								clickFunction = handleAddFolderClick;
							} else if (label === 'Add Divider') {
								clickFunction = handleAddDividerClick;
							} else if (label === 'Add Task') {
								clickFunction = handleAddTaskClick;
							}
							return (
								<div
									key={idx}
									className="form-group text-center"
									style={{ padding: '10px 0' }}>
									<button
										type={type}
										className="btn btn-block"
										onClick={clickFunction}
										style={{
											backgroundColor:
												TASKIFY_THEME_COLOR,
											borderColor: TASKIFY_THEME_COLOR,
											fontSize: '18px',
											borderRadius: '8px',
											marginBottom: '10px',
										}}>
										{label}
									</button>
								</div>
							);
						})}
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-block"
							onClick={handleClose}
							style={{
								backgroundColor: TASKIFY_THEME_COLOR,
								borderColor: TASKIFY_THEME_COLOR,
								fontSize: '18px',
								borderRadius: '8px',
							}}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Overlay;

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function Overlay({
	user,
	show,
	context,
	fields,
	buttons,
	handleClose,
	onAddFolder,
	onAddDivider,
	onAddTask,
}) {
	const [formFields, setFormFields] = useState({});
	const [selectedDivider, setSelectedDivider] = useState();

	const handleFormFieldChange = (key, value) => {
		if (key === 'divider') {
			setSelectedDivider(value);
		}

		setFormFields((prevFormFields) => ({
			...prevFormFields,
			[key]: value,
		}));
	};

	const handleAddFolderClick = () => {
		onAddFolder(formFields);
	};

	const handleAddDividerClick = () => {
		onAddDivider(formFields);
	};

	const handleAddTaskClick = () => {
		onAddTask(formFields);
	};

	if (!show) {
		return null;
	}

	return (
		<div
			className="modal fade show d-block"
			tabIndex="-1"
			role="dialog"
			style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
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
											backgroundColor: '#F38D8D',
											borderColor: '#F38D8D',
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
								backgroundColor: '#F38D8D',
								borderColor: '#F38D8D',
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
}

Overlay.propTypes = {
	user: PropTypes.object.isRequired,
	show: PropTypes.bool.isRequired,
	context: PropTypes.object.isRequired,
	fields: PropTypes.arrayOf(PropTypes.object).isRequired,
	buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
	handleClose: PropTypes.func.isRequired,
	onAddFolder: PropTypes.func.isRequired,
	onAddDivider: PropTypes.func.isRequired,
	onAddTask: PropTypes.func.isRequired,
};

export default Overlay;

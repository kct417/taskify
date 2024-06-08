import PropTypes from 'prop-types';
import {
	DndContext,
	closestCenter,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	DragOverlay,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
	useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState, useEffect } from 'react';
import Overlay from './Overlay';
import MenuPopup from './MenuPopup';
import { useNavigate, useLocation } from 'react-router-dom';
import {
	TASKIFY_THEME_COLOR,
	TASKIFY_WHITE_COLOR,
	API_PREFIX,
} from '../constants';

const Sidebar = ({ user, updateUser, showBanner }) => {
	// handleMenuButtonClick: cases for the menu popup buttons and its
	// corresponding fields and buttons

	const handleMenuButtonClick = (buttonType) => {
		let content = {};
		let fields = [];
		let buttons = [];

		switch (buttonType) {
			case 'Add Folder':
				content = { title: 'Add Folder', text: '' };
				fields = [
					{
						label: 'Folder Name',
						placeholder: 'Enter Folder Name',
						type: 'text',
						key: 'folderName',
					},
					{
						label: 'Divider',
						type: 'dropdown',
						key: 'divider',
						options: dividerNames,
					},
				];
				buttons = [
					{
						label: 'Add Folder',
						type: 'button',
					},
					{
						label: 'Back',
						type: 'button',
						onClick: () => handleShow({ title: 'Menu' }),
					},
				];
				break;
			case 'Add Task':
				content = { title: 'Add Task', text: '' };
				fields = [
					{
						label: 'Task Name',
						placeholder: 'Enter Task Name',
						type: 'text',
						key: 'taskName',
					},
					{
						label: 'Task Due Date',
						placeholder: 'Enter Due Date',
						type: 'date',
						key: 'dueDate',
					},
					{
						label: 'Task Description',
						placeholder: 'Enter Description',
						type: 'text',
						key: 'description',
					},
					{
						label: 'Divider',
						type: 'dropdown',
						key: 'divider',
						options: dividerNames,
					},
					{
						label: 'Folder',
						type: 'dropdown',
						key: 'folder',
						options: [],
					},
				];
				buttons = [
					{
						label: 'Add Task',
						type: 'button',
					},
					{
						label: 'Back',
						type: 'button',
						onClick: () => handleShow({ title: 'Menu' }),
					},
				];
				break;
			case 'Add Divider':
				content = { title: 'Add Divider', text: '' };
				fields = [
					{
						label: 'Divider',
						placeholder: 'Enter your Divider',
						type: 'text',
						key: 'divider',
					},
				];
				buttons = [
					{
						label: 'Add Divider',
						type: 'button',
					},
					{
						label: 'Back',
						type: 'button',
						onClick: () => handleShow({ title: 'Menu' }),
					},
				];
				break;
			case 'Exit':
				handleClose();
				return;
			default:
				return;
		}

		handleShow(content, fields, buttons);
	};

	// handleAddTask: adds a task to the user's data by getting the form fields
	const handleAddTask = (formFields) => {
		const folderName = formFields.folder?.trim();
		const dividerName = formFields.divider?.trim();
		const taskName = formFields.taskName?.trim();
		const dueDate = formFields.dueDate?.trim();
		const description = formFields.description?.trim();

		if (!folderName || !dividerName || !taskName) {
			showBanner(
				'Wait!',
				'Task name, divider, and folder are required fields.',
				'warning',
			);
			return;
		}

		addTask(taskName, dueDate, description, folderName, dividerName)
			.then(() => {
				showBanner('Nice!', 'Task added successfully.', 'success');
				handleClose();
			})
			.catch(() => {
				showBanner('Oops!', 'Failed to add task.', 'danger');
			});
	};

	// addTask: adds a task to the user's data by sending a POST request
	async function addTask(
		taskName,
		dueDate,
		description,
		folderName,
		dividerName,
	) {
		try {
			const response = await fetch(
				`${API_PREFIX}/${user.username}/${dividerName}/${folderName}`,
				{
					method: 'POST',
					headers: addAuthHeader({
						'Content-Type': 'application/json',
					}),
					body: JSON.stringify({
						task: {
							taskName: taskName,
							dueDate: dueDate,
							description: description,
							completed: false,
						},
					}),
				},
			);

			if (response.status === 201) {
				const data = await response.json();
				updateUser(user.token, user.username, user.streak, data);
			} else {
				throw new Error('Failed to add task');
			}
		} catch (error) {
			console.error('Error:', error);
			throw error;
		}
	}

	// handleAddFolder: adds a folder to the user's data by getting the form fields
	const handleAddFolder = (formFields) => {
		const folderName = formFields.folderName?.trim();
		const dividerName = formFields.divider?.trim();
		if (!folderName || !dividerName) {
			showBanner(
				'Hold on!',
				'Please enter a folder name and select a divider.',
				'warning',
			);
			return;
		}
		const folderObject = {
			folderName: folderName,
		};
		addFolder(folderObject, dividerName)
			.then(() => {
				showBanner('Awesome!', 'Folder added successfully.', 'success');
				handleClose();
			})
			.catch(() => {
				showBanner('Oh no!', 'Failed to add folder.', 'danger');
			});
	};

	// addFolder: adds a folder to the user's data by sending a POST request
	async function addFolder(folderEntered, dividerName) {
		try {
			const response = await fetch(
				`${API_PREFIX}/${user.username}/${dividerName}`,
				{
					method: 'POST',
					headers: addAuthHeader({
						'Content-Type': 'application/json',
					}),
					body: JSON.stringify({
						folder: folderEntered,
					}),
				},
			);

			if (response.status === 201) {
				const data = await response.json();
				updateUser(user.token, user.username, user.streak, data);
			} else {
				throw new Error('Failed to add folder');
			}
		} catch (error) {
			console.error('Error:', error);
			throw error; // re-throw the error so the caller can handle it
		}
	}

	// deleteFolder: deletes a folder from the user's data by sending a DELETE request
	async function deleteFolder(folderName, dividerName, folderId) {
		try {
			const response = await fetch(
				`${API_PREFIX}/${user.username}/${dividerName}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({
						folder: {
							folderName: folderName,
							_id: folderId,
						},
					}),
				},
			);
			if (response.status === 200) {
				const data = await response.json();
				updateUser(user.token, user.username, user.streak, data);
			} else {
				throw new Error('Failed to delete folder');
			}
		} catch (error) {
			console.error('Error:', error);
			throw error; // re-throw the error so the caller can handle it
		}
	}

	// handleAddDivider: adds a divider to the user's data by getting the form fields
	const handleAddDivider = (formFields) => {
		const dividerName = formFields.divider?.trim();
		if (!dividerName) {
			showBanner(
				"We're missing something!",
				'Please enter a divider name.',
				'warning',
			);
			return;
		}
		addDivider(dividerName)
			.then(() => {
				showBanner('Cool!', 'Divider added successfully.', 'success');
				handleClose();
			})
			.catch(() => {
				showBanner('Ahh!', 'Failed to add divider.', 'danger');
			});
	};

	// addDivider: adds a divider to the user's data by sending a POST request
	async function addDivider(dividerEntered) {
		try {
			const response = await fetch(`${API_PREFIX}/${user.username}`, {
				method: 'POST',
				headers: addAuthHeader({ 'Content-Type': 'application/json' }),
				body: JSON.stringify({
					divider: {
						dividerName: dividerEntered,
					},
				}),
			});

			if (response.status === 201) {
				const data = await response.json();
				updateUser(user.token, user.username, user.streak, data);
			} else {
				throw new Error('Failed to add divider');
			}
		} catch (error) {
			console.error('Error:', error);
			throw error; // re-throw the error so the caller can handle it
		}
	}

	// async function updateFolderOrdering(dividerName, folder, newIndex) {
	// 	try {
	// 		const response = await fetch(
	// 			`${API_PREFIX}/${user.username}/${dividerName}/${folder.folderName}`,
	// 			{
	// 				method: 'PUT',
	// 				headers: addAuthHeader({
	// 					'Content-Type': 'application/json',
	// 				}),
	// 				body: JSON.stringify({ folder, newIndex }),
	// 			},
	// 		);

	// 		if (response.status === 200) {
	// 			const data = await response.json();
	// 			updateUser(user.token, user.username, user.streak, data);
	// 		} else {
	// 			throw new Error('Failed to update folder ordering');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error:', error);
	// 		throw error;
	// 	}
	// }

	// addAuthHeader: adds the Authorization header to the request
	function addAuthHeader(otherHeaders = {}) {
		return {
			...otherHeaders,
			Authorization: `Bearer ${user.token}`,
		};
	}

	// fetchDividerNames: fetches the divider names from the user's data
	const [dividerNames, setDividerNames] = useState([]);
	useEffect(() => {
		const fetchDividerNames = async () => {
			try {
				const dnames = user.dividers.map(
					(divider) => divider['dividerName'],
				);
				setDividerNames(dnames);
			} catch (error) {
				console.error('Error fetching dividers:', error);
			}
		};

		fetchDividerNames();
	}, [user, updateUser]);

	// Overlay Code
	const navigate = useNavigate();
	const location = useLocation();
	const [overlayConfig, setOverlayConfig] = useState({
		show: false,
		content: null,
		fields: [],
		buttons: [],
	});

	// handleShow: shows the overlay with the given content, fields, and buttons
	const handleShow = (content, fields = [], buttons = []) => {
		setOverlayConfig({
			show: true,
			content,
			fields,
			buttons,
		});
	};

	// handleClose: closes the overlay
	const handleClose = () => {
		setOverlayConfig({
			show: false,
			content: null,
			fields: [],
			buttons: [],
		});
	};

	// Drag and Drop Code
	const [items, setItems] = useState({}); // track items in each divider
	const [activeId, setActiveId] = useState(null); // track active item being dragged
	const [draggedFolder, setDraggedFolder] = useState(null); // track folder being dragged

	// fetchData: fetches the user's data by getting the divider and folder objects
	useEffect(() => {
		const fetchData = async () => {
			const dividerData = {};
			for (const divider of user.dividers) {
				const folderIDName = divider.folders.map((folder) => ({
					id: folder._id,
					name: folder.folderName,
				}));
				dividerData[divider.dividerName] = folderIDName;
			}
			setItems(dividerData);
		};
		fetchData();
	}, [user, updateUser]);

	// useSensors: uses the MouseSensor and TouchSensor for drag and drop
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 10,
				tolerance: 5,
			},
		}),
	);

	// findContainer: finds the container of the given id
	const findContainer = (id) => {
		for (const dividerName in items) {
			if (items[dividerName].some((item) => item.id === id)) {
				return dividerName;
			} else if (dividerName === id) {
				return dividerName;
			}
		}
		return undefined;
	};

	// checkDuplicateFolder: checks if the folder already exists in the divider
	const checkDuplicateFolder = (folderName, dividerName) => {
		for (const divider of user.dividers) {
			if (divider.dividerName === dividerName) {
				for (const folder of divider.folders) {
					if (folder.folderName === folderName) {
						return true;
					}
				}
			}
		}
		return false;
	};

	// handleDragStart: handles the start of dragging a folder
	const handleDragStart = async (event) => {
		const { active } = event;
		setActiveId(active.id);

		// find the divider and folder object for the active id
		const dividerName = findContainer(active.id);
		if (dividerName) {
			const divider = user.dividers.find(
				(div) => div.dividerName === dividerName,
			);
			const folder = divider.folders.find(
				(folder) => folder._id === active.id,
			);
			setDraggedFolder(folder);
		}
	};

	// handleDragEnd: handles the end of dragging a folder
	const handleDragEnd = async (event) => {
		const { active, over } = event;
		setActiveId(null);

		if (!over) return;

		const activeContainer = findContainer(active.id);
		const overContainer = findContainer(over.id);

		if (checkDuplicateFolder(draggedFolder.folderName, overContainer)) {
			showBanner(
				'Hold on!',
				'Folder already exists in the divider.',
				'warning',
			);
			setDraggedFolder(null);
			return;
		}

		if (activeContainer === undefined || overContainer === undefined)
			return;

		if (activeContainer === overContainer) {
			const containerItems = items[activeContainer];
			const oldIndex = containerItems.findIndex(
				(item) => item.id === active.id,
			);
			const newIndex = containerItems.findIndex(
				(item) => item.id === over.id,
			);

			setItems((prevItems) => ({
				...prevItems,
				[activeContainer]: arrayMove(
					containerItems,
					oldIndex,
					newIndex,
				),
			}));
		} else {
			try {
				// delete the folder from the old divider
				await deleteFolder(
					draggedFolder.folderName,
					activeContainer,
					draggedFolder._id,
				);

				// add the folder to the new divider
				await addFolder(draggedFolder, overContainer);

				setItems((prevItems) => {
					const activeItems = prevItems[activeContainer].filter(
						(item) => item.id !== active.id,
					);
					const overItems = [
						...prevItems[overContainer],
						{ id: active.id, name: draggedFolder.folderName },
					];

					if (
						location.pathname ===
						`/${user.username}/${activeContainer}/${draggedFolder.folderName}`
					) {
						navigate(
							`/${user.username}/${overContainer}/${draggedFolder.folderName}`,
							{
								state: {
									folderName: draggedFolder.folderName,
									dividerName: overContainer,
									streak: user.streak,
								},
							},
						);
					}

					return {
						...prevItems,
						[activeContainer]: activeItems,
						[overContainer]: overItems,
					};
				});
			} catch (error) {
				console.error('Error moving folder:', error);
			} finally {
				setDraggedFolder(null);
			}
		}
	};

	return (
		<div
			className="d-flex flex-column position-relative"
			style={{
				backgroundColor: '#D2C0C0',
				width: '15vw',
				height: '100vh',
				fontSize: '16px',
				paddingTop: '20px',
			}}>
			<div className="p-3">
				<button
					className="btn btn-primary rounded-pill text-left"
					style={{
						backgroundColor: TASKIFY_THEME_COLOR,
						borderColor: TASKIFY_THEME_COLOR,
						fontSize: '18px',
					}}
					onClick={() => navigate(`/${user.username}`)}>
					Home
				</button>
			</div>
			<div
				className="flex-grow-1 p-3"
				style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto' }}>
				<div style={{ backgroundColor: '#D2C0C0' }}>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}>
						{Object.keys(items).map((dividerName) => (
							<div key={dividerName}>
								<div
									className="fw-bold mb-4"
									style={{ fontSize: '20px' }}>
									{dividerName}
								</div>
								<SortableContext
									items={items[dividerName]}
									strategy={verticalListSortingStrategy}>
									{items[dividerName].map(({ id, name }) => (
										<SortableItem
											username={user.username}
											key={id}
											id={id}
											name={name}
											dividerName={dividerName}
											streak={user.streak}
											navigate={navigate}
										/>
									))}
									{items[dividerName].length === 0 && (
										<EmptySection id={dividerName} />
									)}
								</SortableContext>
							</div>
						))}
						<DragOverlay>
							{activeId ? (
								<SortableItem
									username={user.username}
									id={activeId}
									name={
										items[findContainer(activeId)].find(
											(item) => item.id === activeId,
										).name
									}
									isDragging={true}
								/>
							) : null}
						</DragOverlay>
					</DndContext>
				</div>
			</div>
			<hr style={{ marginBottom: '20px' }} />
			<div
				className="p-3 position-absolute d-flex justify-content-center"
				style={{ bottom: '10px', left: '10px' }}>
				<button
					className="btn btn-primary rounded-circle d-flex justify-content-center align-items-center"
					type="button"
					onClick={() => handleShow({ title: 'Menu' })}
					style={{
						backgroundColor: TASKIFY_WHITE_COLOR,
						borderColor: TASKIFY_WHITE_COLOR,
						width: '50px',
						height: '50px',
					}}>
					<span
						className="fs-3"
						style={{
							lineHeight: '0px',
							fontSize: '30px',
							color: TASKIFY_THEME_COLOR,
						}}>
						+
					</span>
				</button>
			</div>
			{overlayConfig.show && overlayConfig.content.title === 'Menu' && (
				<MenuPopup onButtonClick={handleMenuButtonClick} />
			)}
			{overlayConfig.show && overlayConfig.content.title !== 'Menu' && (
				<Overlay
					user={user}
					context={overlayConfig.content}
					fields={overlayConfig.fields}
					buttons={overlayConfig.buttons}
					show={overlayConfig.show}
					handleClose={handleClose}
					onAddFolder={handleAddFolder}
					onAddDivider={handleAddDivider}
					onAddTask={handleAddTask}
				/>
			)}
		</div>
	);
};

// SortableItem: displays the folder name as a sortable item
const SortableItem = ({
	username,
	id,
	name: folderName,
	dividerName,
	streak,
	navigate,
	isDragging,
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id,
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<button
			ref={setNodeRef}
			style={{
				...style,
				backgroundColor: TASKIFY_THEME_COLOR,
				borderColor: TASKIFY_THEME_COLOR,
				fontSize: '18px',
			}}
			className="btn btn-primary rounded-pill mb-2 text-left ml-4"
			{...attributes}
			{...listeners}
			// navigate to the folder page when the folder name is clicked
			onClick={() =>
				navigate(`/${username}/${dividerName}/${folderName}`, {
					state: {
						folderName: folderName,
						dividerName: dividerName,
						streak: streak,
					},
				})
			}>
			{folderName}
		</button>
	);
};

// EmptySection: displays a message to drag items to add to the divider
const EmptySection = ({ id }) => {
	const { setNodeRef } = useSortable({
		id,
	});

	return (
		<div
			ref={setNodeRef}
			style={{
				border: '2px dashed #ccc',
				padding: '20px',
				textAlign: 'center',
			}}>
			Drag items here to add to {id}
		</div>
	);
};

SortableItem.propTypes = {
	username: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	dividerName: PropTypes.string,
	streak: PropTypes.number,
	navigate: PropTypes.func,
	isDragging: PropTypes.bool,
};

EmptySection.propTypes = {
	id: PropTypes.string.isRequired,
};

Sidebar.propTypes = {
	user: PropTypes.object.isRequired,
	updateUser: PropTypes.func.isRequired,
	showBanner: PropTypes.func.isRequired,
};

export default Sidebar;

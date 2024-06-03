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

const Sidebar = ({ API_PREFIX, user, setUser }) => {
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
						label: 'Divider',
						type: 'dropdown',
						key: 'divider',
						options: ['Divider 1', 'Divider 2', 'Divider 3'],
					},
					{
						label: 'Folder',
						type: 'dropdown',
						key: 'folder',
						options: ['Divider 1', 'Divider 2', 'Divider 3'],
					},
				];
				buttons = [
					{
						label: 'Add Task',
						type: 'button',
						onClick: () => alert('Task added!'),
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
			case 'Prompt AI':
				content = { title: 'Prompt AI', text: '' };
				fields = [
					{
						label: 'Prompt',
						placeholder: 'Enter your prompt',
						type: 'text',
						key: 'prompt',
					},
				];
				buttons = [
					{
						label: 'Send Prompt',
						type: 'button',
						onClick: () => alert('Prompt sent!'),
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

	const handleAddFolder = (formFields) => {
		const folderName = formFields.folderName?.trim();
		const dividerName = formFields.divider?.trim();
		if (!folderName || !dividerName) {
			alert('Please enter a folder name and select a divider');
			return;
		}
		addFolder(folderName, dividerName)
			.then(() => {
				alert('Folder added successfully');
				handleClose();
			})
			.catch((error) => {
				console.error('Error adding folder:', error);
				alert('Failed to add folder');
			});
	};

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
						folder: {
							folderName: folderEntered,
						},
					}),
				},
			);

			if (response.status === 201) {
				const data = await response.json();
				setUser(user.token, user.username, data);
			} else {
				throw new Error('Failed to add folder');
			}
		} catch (error) {
			console.error('Error:', error);
			throw error; // re-throw the error so the caller can handle it
		}
	}

	// const deleteTask = async (task, dividerName, folderName) => {
	// 	console.log(task, dividerName, folderName);
	// 	try {
	// 		const response = await fetch(
	// 			`${API_PREFIX}/${user.username}/${dividerName}/${folderName}`,
	// 			{
	// 				method: 'DELETE',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 					Authorization: `Bearer ${user.token}`,
	// 				},
	// 				body: JSON.stringify({ task: task }),
	// 			},
	// 		);
	// 		if (response.ok) {
	// 			// Refresh tasks after deletion
	// 			const updatedUserResponse = await fetch(
	// 				`${API_PREFIX}/${user.username}`,
	// 				{
	// 					headers: {
	// 						Authorization: `Bearer ${user.token}`,
	// 					},
	// 				},
	// 			);
	// 			const updatedUserData = await updatedUserResponse.json();
	// 			updateUserData(user.token, user.username, updatedUserData);
	// 		} else {
	// 			console.error('Failed to delete task');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error deleting task:', error);
	// 	}
	// };

	async function deleteFolder(folderName, dividerName, folderId) {
		// console.log(folderName, dividerName);
		// console.log(
		// 	`Deleting folder from URL: ${API_PREFIX}/${user.username}/${dividerName}`,
		// );
		// console.log(
		// 	user.dividers.find((d) => d.dividerName === dividerName).folders,
		// );
		console.log(folderName, dividerName, folderId);
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
							folderId: folderId,
						},
					}),
				},
			);
			console.log(response);
			if (response.status === 200) {
				const data = await response.json();
				console.log(data);
				setUser(user.token, user.username, data);
			} else {
				throw new Error('Failed to delete folder');
			}
		} catch (error) {
			console.error('Error:', error);
			throw error; // re-throw the error so the caller can handle it
		}
	}

	const handleAddDivider = (formFields) => {
		const dividerName = formFields.divider?.trim();
		if (!dividerName) {
			alert('Please enter a divider name');
			return;
		}
		addDivider(dividerName)
			.then(() => {
				alert('Divider added successfully');
				handleClose();
			})
			.catch((error) => {
				console.error('Error adding divider:', error);
				alert('Failed to add divider');
			});
	};

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
				setUser(user.token, user.username, data);
			} else {
				throw new Error('Failed to add divider');
			}
		} catch (error) {
			console.error('Error:', error);
			throw error; // re-throw the error so the caller can handle it
		}
	}

	function addAuthHeader(otherHeaders = {}) {
		return {
			...otherHeaders,
			Authorization: `Bearer ${user.token}`,
		};
	}

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
	}, [user, setUser]);

	// Overlay Code
	const [overlayConfig, setOverlayConfig] = useState({
		show: false,
		content: null,
		fields: [],
		buttons: [],
	});

	const handleShow = (content, fields = [], buttons = []) => {
		setOverlayConfig({
			show: true,
			content,
			fields,
			buttons,
		});
	};

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

	useEffect(() => {
		const fetchData = async () => {
			const dividerData = {};
			for (const divider of user.dividers) {
				const folderNames = divider.folders.map(
					(folder) => folder.folderName,
				);
				dividerData[divider.dividerName] = folderNames;
			}
			setItems(dividerData);
		};
		fetchData();
	}, [user, setUser]);

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

	const handleDragStart = async (event) => {
		const { active } = event;
		setActiveId(active.id);

		// Find the divider and folder object for the active id
		const dividerName = findContainer(active.id);
		if (dividerName) {
			const divider = user.dividers.find(
				(div) => div.dividerName === dividerName,
			);
			const folder = divider.folders.find(
				(folder) => folder.folderName === active.id,
			);
			setDraggedFolder(folder);
		}
	};

	const handleDragEnd = async (event) => {
		const { active, over } = event;
		setActiveId(null);

		if (!over) return;

		const activeContainer = findContainer(active.id);
		const overContainer = findContainer(over.id);

		if (activeContainer === undefined || overContainer === undefined)
			return;

		if (activeContainer === overContainer) {
			const containerItems = items[activeContainer];
			const oldIndex = containerItems.indexOf(active.id);
			const newIndex = containerItems.indexOf(over.id);

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
				// Delete the folder from the old divider
				await deleteFolder(
					draggedFolder.folderName,
					activeContainer,
					draggedFolder._id,
				);

				// Add the folder to the new divider
				// await addFolder(draggedFolder.folderName, overContainer);

				setItems((prevItems) => {
					const activeItems = prevItems[activeContainer].filter(
						(item) => item !== active.id,
					);
					const overItems = [...prevItems[overContainer], active.id];

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

	const findContainer = (id) => {
		for (const dividerName in items) {
			if (items[dividerName].includes(id)) {
				return dividerName;
			} else if (dividerName === id) {
				return dividerName;
			}
		}
		return undefined;
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
						backgroundColor: '#F38D8D',
						borderColor: '#F38D8D',
						fontSize: '18px',
					}}>
					Home
				</button>
			</div>
			<div
				className="flex-grow-1 p-3"
				style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto' }}>
				{/* Wrapper div for scrollable content with background color */}
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
									{items[dividerName].map((id) => (
										<SortableItem key={id} id={id} />
									))}
									{items[dividerName].length === 0 && (
										<EmptySection id={dividerName} />
									)}
								</SortableContext>
							</div>
						))}
						<DragOverlay>
							{activeId ? (
								<SortableItem id={activeId} isDragging />
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
						backgroundColor: '#FFFFFF',
						borderColor: '#FFFFFF',
						width: '50px',
						height: '50px',
					}}>
					<span
						className="fs-3"
						style={{
							lineHeight: '0px',
							fontSize: '30px',
							color: '#F38D8D',
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
				/>
			)}
		</div>
	);
};

const SortableItem = ({ id, isDragging }) => {
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
				backgroundColor: '#F38D8D',
				borderColor: '#F38D8D',
				fontSize: '18px',
			}}
			className="btn btn-primary rounded-pill mb-2 text-left ml-4"
			{...attributes}
			{...listeners}>
			{id}
		</button>
	);
};

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
	id: PropTypes.string.isRequired,
	isDragging: PropTypes.bool,
};

EmptySection.propTypes = {
	id: PropTypes.string.isRequired,
};

Sidebar.propTypes = {
	API_PREFIX: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired,
};

export default Sidebar;

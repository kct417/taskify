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
	const handleAddTask = (formFields) => {
		const folderName = formFields.folder?.trim();
		const dividerName = formFields.divider?.trim();
		const taskName = formFields.taskName?.trim();
		const dueDate = formFields.dueDate?.trim();
		const description = formFields.description?.trim();

		if (
			!folderName ||
			!dividerName ||
			!taskName ||
			!dueDate ||
			!description
		) {
			alert(
				'Please select a folder and select a divider and populate all task fields',
			);
			return;
		}

		addTask(taskName, dueDate, description, folderName, dividerName)
			.then(() => {
				alert('Task added successfully');
				handleClose();
			})
			.catch((error) => {
				console.error('Error adding task:', error);
				alert('Failed to add task');
			});
	};

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
				setUser(user.token, user.username, data);
			} else {
				throw new Error('Failed to add task');
			}
		} catch (error) {
			console.error('Error:', error);
			throw error; // re-throw the error so the caller can handle it
		}
	}

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
				const names = user.dividers.map(
					(divider) => divider['dividerName'],
				);
				setDividerNames(names);
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
	const [items, setItems] = useState({
		Physics: ['Homework'],
		SoftwareEngineering: [
			'Project',
			'Assignment',
			'Quiz',
			'Midterm',
			'Final',
		],
	});
	const [activeId, setActiveId] = useState(null);

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

	// Drag and Drop Code
	const handleDragStart = (event) => {
		const { active } = event;
		setActiveId(active.id);
	};

	const handleDragEnd = (event) => {
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
		}
	};

	const findContainer = (id) => {
		if (items.Physics.includes(id)) {
			return 'Physics';
		} else if (items.SoftwareEngineering.includes(id)) {
			return 'SoftwareEngineering';
		} else if (id === 'Physics' || id === 'SoftwareEngineering') {
			return id;
		} else {
			return undefined;
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
						<div
							className="fw-bold mb-4"
							style={{ fontSize: '20px' }}>
							Physics
						</div>
						<SortableContext
							items={items.Physics}
							strategy={verticalListSortingStrategy}>
							{items.Physics.map((id) => (
								<SortableItem key={id} id={id} />
							))}
							{items.Physics.length === 0 && (
								<EmptySection id="Physics" />
							)}
						</SortableContext>
						<div
							className="fw-bold mb-4"
							style={{ fontSize: '20px' }}>
							Software Engineering
						</div>
						<SortableContext
							items={items.SoftwareEngineering}
							strategy={verticalListSortingStrategy}>
							{items.SoftwareEngineering.map((id) => (
								<SortableItem key={id} id={id} />
							))}
							{items.SoftwareEngineering.length === 0 && (
								<EmptySection id="SoftwareEngineering" />
							)}
						</SortableContext>
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
					onAddTask={handleAddTask}
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

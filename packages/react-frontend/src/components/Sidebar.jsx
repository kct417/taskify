import React from 'react';
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
	sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Sidebar = () => {
	const [items, setItems] = React.useState({
		Physics: ['Homework'],
		SoftwareEngineering: [
			'Project',
			'Assignment',
			'Quiz',
			'Midterm',
			'Final',
		],
	});
	const [activeId, setActiveId] = React.useState(null);

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
					className="btn rounded-circle d-flex justify-content-center align-items-center"
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

export default Sidebar;

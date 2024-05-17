import React from 'react';
import {
	DndContext,
	closestCenter,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
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
		SoftwareEngineering: [''],
	});

	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		}),
	);

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (!over) return;

		const activeContainer = findContainer(active.id);
		const overContainer = findContainer(over.id);

		if (
			activeContainer &&
			overContainer &&
			activeContainer !== overContainer
		) {
			setItems((prev) => {
				const activeItems = prev[activeContainer];
				const overItems = prev[overContainer];
				const activeIndex = activeItems.indexOf(active.id);
				const newActiveItems = [...activeItems];
				const newOverItems = [...overItems];

				newActiveItems.splice(activeIndex, 1);
				newOverItems.splice(
					overItems.indexOf(over.id) + 1,
					0,
					active.id,
				);

				return {
					...prev,
					[activeContainer]: newActiveItems,
					[overContainer]: newOverItems,
				};
			});
		}
	};

	const findContainer = (id) => {
		if (items.Physics.includes(id)) {
			return 'Physics';
		} else if (items.SoftwareEngineering.includes(id)) {
			return 'SoftwareEngineering';
		}
	};

	return (
		<div
			className="d-flex flex-column position-relative pl-3"
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
			<div className="flex-grow-1 p-3 overflow-auto">
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}>
					<div className="fw-bold mb-4" style={{ fontSize: '20px' }}>
						Physics
					</div>
					<SortableContext
						items={items.Physics}
						strategy={verticalListSortingStrategy}>
						{items.Physics.map((id) => (
							<SortableItem key={id} id={id} />
						))}
					</SortableContext>
					<div className="fw-bold mb-4" style={{ fontSize: '20px' }}>
						Software Engineering
					</div>
					<SortableContext
						items={items.SoftwareEngineering}
						strategy={verticalListSortingStrategy}>
						{items.SoftwareEngineering.map((id) => (
							<SortableItem key={id} id={id} />
						))}
					</SortableContext>
				</DndContext>
			</div>
			<hr style={{ marginBottom: '20px' }} />
			<div
				className="p-3 position-absolute d-flex justify-content-center"
				style={{ bottom: '10px', left: '10px' }}>
				<button
					className="btn btn-primary rounded-circle d-flex justify-content-center align-items-center"
					style={{
						backgroundColor: '#F38D8D',
						borderColor: '#F38D8D',
						width: '50px',
						height: '50px',
					}}>
					<span
						className="fs-3"
						style={{ lineHeight: '0px', fontSize: '30px' }}>
						+
					</span>
				</button>
			</div>
		</div>
	);
};

const SortableItem = ({ id }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
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

export default Sidebar;

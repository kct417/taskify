import { useState } from 'react';
import Overlay from './Overlay';
import MenuPopup from './MenuPopup';

const Sidebar = () => {
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
				];
				buttons = [
					{
						label: 'Add Folder',
						type: 'button',
						onClick: () => alert('Folder added!'),
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
						onClick: () => alert('Divider added!'),
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
				<div className="fw-bold mb-4" style={{ fontSize: '20px' }}>
					Physics
				</div>
				<button
					className="btn btn-primary rounded-pill mb-2 text-left ml-4"
					style={{
						backgroundColor: '#F38D8D',
						borderColor: '#F38D8D',
						fontSize: '18px',
					}}>
					Homework
				</button>
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

			{overlayConfig.show && overlayConfig.content.title === 'Menu' && (
				<MenuPopup onButtonClick={handleMenuButtonClick} />
			)}

			{overlayConfig.show && overlayConfig.content.title !== 'Menu' && (
				<Overlay
					context={overlayConfig.content}
					fields={overlayConfig.fields}
					buttons={overlayConfig.buttons}
					show={overlayConfig.show}
					handleClose={handleClose}
				/>
			)}
		</div>
	);
};

export default Sidebar;

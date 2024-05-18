import { useState } from 'react';

import Overlay from './Overlay';

const Sidebar = () => {
	const [show, setShow] = useState(false);

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

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
					className="btn btn-primary rounded-pill mb-2 text-left ml-4" // Add left margin to indent the button
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
				className="p-3 position-absolute d-flex justify-content-center" // Center the button horizontally
				style={{ bottom: '10px', left: '10px' }}>
				<button
					className="btn btn-primary rounded-circle d-flex justify-content-center align-items-center"
					type="button"
					onClick={handleShow}
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
					</span>{' '}
				</button>
				<Overlay
					context={{ title: 'Add Menu' }}
					fields={[]}
					buttons={[
						{ label: 'Add Folders' },
						{ label: 'Add Task' },
						{ label: 'Add Divider' },
						{ label: 'Prompt AI' },
					]}
					show={show}
					handleClose={handleClose}
				/>
			</div>
		</div>
	);
};

export default Sidebar;

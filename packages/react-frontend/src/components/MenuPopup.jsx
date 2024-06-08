import PropTypes from 'prop-types';
import { useState } from 'react';

// MenuPopup component-specific CSS styling
const styles = {
	menuPopup: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		background: 'white',
		width: '600px',
		padding: '20px',
		borderRadius: '10px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '10px',
		zIndex: 1000,
	},
	title: {
		margin: 0,
		textAlign: 'left',
		width: '100%',
	},
	menuButton: {
		background: '#eeaaaa',
		border: 'none',
		color: 'white',
		padding: '10px 20px',
		fontSize: '16px',
		borderRadius: '5px',
		width: '100%',
		cursor: 'pointer',
		transition: 'background 0.3s',
	},
	menuButtonHover: {
		background: '#ff3b3b',
	},
};

const MenuPopup = ({ onButtonClick }) => {
	MenuPopup.propTypes = {
		onButtonClick: PropTypes.func.isRequired,
	};

	const MenuButton = ({ children, onClick }) => {
		MenuButton.propTypes = {
			children: PropTypes.node.isRequired,
			onClick: PropTypes.func.isRequired,
		};

		const [isHovering, setIsHovering] = useState(false);
		return (
			<button
				style={{
					...styles.menuButton,
					...(isHovering ? styles.menuButtonHover : {}),
				}}
				onClick={onClick}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}>
				{children}
			</button>
		);
	};

	return (
		<div style={styles.menuPopup}>
			<h2 style={styles.title}>Add Item</h2>
			<MenuButton onClick={() => onButtonClick('Add Divider')}>
				Add Divider
			</MenuButton>
			<MenuButton onClick={() => onButtonClick('Add Folder')}>
				Add Folder
			</MenuButton>
			<MenuButton onClick={() => onButtonClick('Add Task')}>
				Add Task
			</MenuButton>
			<MenuButton onClick={() => onButtonClick('Exit')}>Exit</MenuButton>
		</div>
	);
};

export default MenuPopup;

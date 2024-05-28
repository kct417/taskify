import React from 'react';
import PropTypes from 'prop-types';

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

class MenuButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovered: false,
		};
	}

	toggleHover = () => {
		this.setState({ isHovered: !this.state.isHovered });
	};

	render() {
		const { onClick, children } = this.props;
		const { isHovered } = this.state;
		return (
			<button
				style={{
					...styles.menuButton,
					...(isHovered ? styles.menuButtonHover : {}),
				}}
				onClick={onClick}
				onMouseEnter={this.toggleHover}
				onMouseLeave={this.toggleHover}>
				{children}
			</button>
		);
	}
}

function MenuPopup({ onButtonClick }) {
	return (
		<div style={styles.menuPopup}>
			<h2 style={styles.title}>Add Item</h2>
			<MenuButton onClick={() => onButtonClick('Add Folder')}>
				Add Folder
			</MenuButton>
			<MenuButton onClick={() => onButtonClick('Add Task')}>
				Add Task
			</MenuButton>
			<MenuButton onClick={() => onButtonClick('Add Divider')}>
				Add Divider
			</MenuButton>
			<MenuButton onClick={() => onButtonClick('Prompt AI')}>
				Prompt AI
			</MenuButton>
			<MenuButton onClick={() => onButtonClick('Exit')}>Exit</MenuButton>
		</div>
	);
}

MenuButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

MenuPopup.propTypes = {
	onButtonClick: PropTypes.func.isRequired,
};

export default MenuPopup;

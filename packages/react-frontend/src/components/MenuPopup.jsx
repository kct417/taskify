import React from 'react';
import PropTypes from 'prop-types';
import './MenuPopup.css';

function MenuPopup({ onButtonClick }) {
	return (
		<div className="menu-popup">
			<h2>Add Item</h2>
			<button
				className="menu-button"
				onClick={() => onButtonClick('Add Folder')}>
				Add Folder
			</button>
			<button
				className="menu-button"
				onClick={() => onButtonClick('Add Task')}>
				Add Task
			</button>
			<button
				className="menu-button"
				onClick={() => onButtonClick('Add Divider')}>
				Add Divider
			</button>
			<button
				className="menu-button"
				onClick={() => onButtonClick('Prompt AI')}>
				Prompt AI
			</button>
			<button
				className="menu-button"
				onClick={() => onButtonClick('Exit')}>
				Exit
			</button>
		</div>
	);
}

MenuPopup.propTypes = {
	onButtonClick: PropTypes.func.isRequired,
};

export default MenuPopup;

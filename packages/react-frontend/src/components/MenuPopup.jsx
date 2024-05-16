import React from 'react';
import './MenuPopup.css';

function MenuPopup() {
	return (
		<div className="menu-popup">
			<h2>Add Item</h2>
			<button className="menu-button">Add Folder</button>
			<button className="menu-button">Add Task</button>
			<button className="menu-button">Add Divider</button>
			<button className="menu-button">Prompt AI</button>
			<button className="menu-button">Exit</button>
		</div>
	);
}

export default MenuPopup;

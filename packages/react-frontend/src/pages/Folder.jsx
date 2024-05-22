import React from 'react';
import Folder_Form from '../components/Folder_Form';
import Sidebar from '../components/Sidebar';

const Folder = () => {
	return (
		<div className="d-flex">
			<Sidebar />
			<Folder_Form />
		</div>
	);
};

export default Folder;

import PropTypes from 'prop-types';

import FolderForm from '../components/FolderForm';
import Sidebar from '../components/Sidebar';

const Folder = ({ API_PREFIX, token, INVALID_TOKEN }) => {
	return (
		<div
			className="d-flex"
			style={{ height: '100vh', overflowY: 'hidden' }}>
			<Sidebar />
			<div
				className="container-fluid p-0 d-flex"
				style={{ overflowY: 'auto' }}>
				<FolderForm
					API_PREFIX={API_PREFIX}
					token={token}
					INVALID_TOKEN={INVALID_TOKEN}
				/>
			</div>
		</div>
	);
};

Folder.propTypes = {
	API_PREFIX: PropTypes.string.isRequired,
	token: PropTypes.string.isRequired,
	INVALID_TOKEN: PropTypes.string.isRequired,
};

export default Folder;

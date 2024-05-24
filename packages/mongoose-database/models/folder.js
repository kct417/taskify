import mongoose from 'mongoose';
import Divider from './dividers';

const UserFolders = new mongoose.Schema(
	{
		foldername: {
			type: String,
			required: true,
			trim: true,
		},
		divider: {
			type: Divider,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
	},
	{ collection: 'folders' },
);

const Folder = mongoose.model('Folder', UserFolders);

export default Folder;

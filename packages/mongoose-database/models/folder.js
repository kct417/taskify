import mongoose from 'mongoose';

const UserFolders = new mongoose.Schema(
	{
		folderName: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		tasks: {
			type: Array,
			required: true,
			trim: true,
		},
	},
	{ collection: 'folders' },
);

const Folder = mongoose.model('Folder', UserFolders);

export default Folder;

import mongoose from 'mongoose';

const UserFolders = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
		},
		foldername: {
			type: String,
			required: true,
			trim: true,
		},
		dividername: {
			type: String,
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

import mongoose from 'mongoose';
import Folder from './folder';

const UserTasks = new mongoose.Schema(
	{
		taskname: {
			type: String,
			required: true,
			trim: true,
		},
		folder: {
			type: Folder,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
	},
	{ collection: 'tasks' },
);

const Task = mongoose.model('Task', UserTasks);

export default Task;

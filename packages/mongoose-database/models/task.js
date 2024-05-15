import mongoose from 'mongoose';

const UserTasks = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
		},
		taskname: {
			type: String,
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

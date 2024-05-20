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
		// completed, due date, folder 
	},
	{ collection: 'tasks' },
);

const Task = mongoose.model('Task', UserTasks);

export default Task;

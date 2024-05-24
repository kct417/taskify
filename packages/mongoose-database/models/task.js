import mongoose from 'mongoose';

const UserTasks = new mongoose.Schema(
	{
		taskName: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		dueDate: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
			required: true,
		},
	},
	{ collection: 'tasks' },
);

const Task = mongoose.model('Task', UserTasks);

export default Task;

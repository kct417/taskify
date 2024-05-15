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
			validate(value) {
				if (value.length < 1)
					throw new Error(
						'Invalid task, must be at least 1 character.',
					);
			},
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

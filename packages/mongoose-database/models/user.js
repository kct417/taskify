import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
	taskName: { type: String, required: true },
	description: { type: String },
	dueDate: { type: Date },
	completed: { type: Boolean, default: false },
});

const folderSchema = new mongoose.Schema({
	folderName: { type: String, required: true },
	description: { type: String },
	tasks: [taskSchema],
});

const dividerSchema = new mongoose.Schema({
	dividerName: { type: String, required: true },
	folders: [folderSchema],
});

const userSchema = new mongoose.Schema(
	{
		firstName: { type: String },
		lastName: { type: String },
		username: { type: String, required: true, unique: true },
		hashedPassword: { type: String, required: true },
		dividers: [dividerSchema],
	},
	{ collection: 'users' },
);

const User = mongoose.model('User', userSchema);

export default User;

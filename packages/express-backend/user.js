import mongoose from 'mongoose';

// user model is a tree structure
// users will contain an array of dividers
// dividers will contain an array of folders
// folders will contain an array of tasks
// frontend receives the array of dividers
// frontend parses the dividers for sub arrays
// user model should only be used in user-services.js

const taskSchema = new mongoose.Schema({
	taskName: { type: String, trim: true, required: true },
	description: { type: String, trim: true },
	dueDate: { type: Date, trim: true },
	completed: { type: Boolean, trim: true, default: false },
	ordering: { type: Number, trim: true },
	created: { type: Date, trim: true, default: Date.now },
});

const folderSchema = new mongoose.Schema({
	folderName: { type: String, trim: true, required: true },
	tasks: [taskSchema],
	ordering: { type: Number, trim: true },
	created: { type: Date, trim: true, default: Date.now },
});

const dividerSchema = new mongoose.Schema({
	dividerName: { type: String, trim: true, required: true },
	folders: [folderSchema],
	ordering: { type: Number, trim: true },
	created: { type: Date, trim: true, default: Date.now },
});

const userSchema = new mongoose.Schema(
	{
		firstName: { type: String, trim: true },
		lastName: { type: String, trim: true },
		username: { type: String, trim: true, required: true, unique: true },
		hashedPassword: { type: String, trim: true, required: true },
		dividers: [dividerSchema],
		streak: { type: Number, trim: true, default: 0 },
		created: { type: Date, trim: true, default: Date.now },
	},
	{ collection: 'users' },
);

const User = mongoose.model('User', userSchema);

export default User;

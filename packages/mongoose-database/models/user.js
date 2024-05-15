import mongoose from 'mongoose';

const UserCredentials = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			trim: true,
		},
		hashedPassword: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ collection: 'users' },
);

const User = mongoose.model('User', UserCredentials);

export default User;

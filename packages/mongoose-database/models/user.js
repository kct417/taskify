import mongoose from 'mongoose';

const UserCredentials = new mongoose.Schema(
	{
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

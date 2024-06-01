import userModel from '../models/user.js';

export function addUser(user) {
	const userToAdd = new userModel(user);
	return userToAdd.save();
}

export function findUserByName(username) {
	return userModel.findOne({ username: username });
}

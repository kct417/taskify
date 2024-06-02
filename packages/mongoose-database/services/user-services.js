import userModel from '../models/user.js';

export const addUser = (user) => {
	const userToAdd = new userModel(user);
	return userToAdd.save();
};

export const findUser = (username) => {
	return userModel.findOne({ username: username });
};

export const updateDividers = async (username, divider, updateType) => {
	try {
		let updateOperation;
		let arrayFilters = [];
		switch (updateType) {
			case 'set':
				updateOperation = {
					$set: { 'dividers.$[divider]': divider },
				};
				arrayFilters.push({ 'divider._id': divider._id });
				break;
			case 'push':
				updateOperation = { $push: { dividers: divider } };
				break;
			case 'pull':
				updateOperation = {
					$pull: { dividers: { _id: divider._id } },
				};
				break;
			default:
				throw new Error(`Invalid update type: ${updateType}`);
		}

		const updatedUser = await userModel.findOneAndUpdate(
			{ username: username },
			updateOperation,
			{
				arrayFilters: arrayFilters,
				new: true,
			},
		);
		return updatedUser;
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const updateFolders = async (
	username,
	dividerName,
	folder,
	updateType,
) => {
	try {
		let updateOperation;
		let arrayFilters = [{ 'divider.dividerName': dividerName }];
		switch (updateType) {
			case 'set':
				updateOperation = {
					$set: { 'dividers.$[divider].folders.$[folder]': folder },
				};
				arrayFilters.push({ 'folder._id': folder._id });
				break;
			case 'push':
				updateOperation = {
					$push: { 'dividers.$[divider].folders': folder },
				};
				break;
			case 'pull':
				updateOperation = {
					$pull: {
						'dividers.$[divider].folders': { _id: folder._id },
					},
				};
				break;
			default:
				throw new Error(`Invalid update type: ${updateType}`);
		}

		const updatedUser = await userModel.findOneAndUpdate(
			{ username: username },
			updateOperation,
			{
				arrayFilters: arrayFilters,
				new: true,
			},
		);
		return updatedUser.dividers;
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const updateTasks = async (
	username,
	dividerName,
	folderName,
	task,
	updateType,
) => {
	try {
		let updateOperation;
		let arrayFilters = [
			{ 'divider.dividerName': dividerName },
			{ 'folder.folderName': folderName },
		];
		switch (updateType) {
			case 'set':
				updateOperation = {
					$set: {
						'dividers.$[divider].folders.$[folder].tasks.$[task]':
							task,
					},
				};
				arrayFilters.push({ 'task._id': task._id });
				break;
			case 'push':
				updateOperation = {
					$push: {
						'dividers.$[divider].folders.$[folder].tasks': task,
					},
				};
				break;
			case 'pull':
				updateOperation = {
					$pull: {
						'dividers.$[divider].folders.$[folder].tasks': {
							_id: task._id,
						},
					},
				};
				break;
			default:
				throw new Error(`Invalid update type: ${updateType}`);
		}

		const updatedUser = await userModel.findOneAndUpdate(
			{ username: username },
			updateOperation,
			{
				arrayFilters: arrayFilters,
				new: true,
			},
		);
		return updatedUser.dividers;
	} catch (err) {
		console.error(err);
		return null;
	}
};

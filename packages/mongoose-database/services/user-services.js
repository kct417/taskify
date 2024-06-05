import userModel from '../models/user.js';

export const addUser = (user) => {
	return userModel.create(user);
};

export const findUser = (username) => {
	return userModel.findOne({ username });
};

export const updateDividers = async (username, divider, updateType) => {
	try {
		const user = await findUser(username);
		if (!user) {
			throw new Error('User not found');
		}

		let updateOperation;
		let arrayFilters = [];
		let existingDivider;
		switch (updateType) {
			case 'set':
				existingDivider = user.dividers.find((d) =>
					d._id.equals(divider._id),
				);
				if (!existingDivider) {
					throw new Error('Divider not found');
				}
				updateOperation = {
					$set: { 'dividers.$[divider]': divider },
				};
				arrayFilters.push({ 'divider._id': divider._id });
				break;
			case 'push':
				if (
					user.dividers.some(
						(d) => d.dividerName === divider.dividerName,
					)
				) {
					throw new Error('Divider already exists');
				}
				updateOperation = { $push: { dividers: divider } };
				break;
			case 'pull':
				existingDivider = user.dividers.find((d) =>
					d._id.equals(divider._id),
				);
				if (!existingDivider) {
					throw new Error('Divider not found');
				}
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
		const user = await findUser(username);
		if (!user) {
			throw new Error('User not found');
		}

		const divider = user.dividers.find(
			(d) => d.dividerName === dividerName,
		);
		if (!divider) {
			throw new Error('Divider not found');
		}

		let updateOperation;
		let arrayFilters = [{ 'divider.dividerName': dividerName }];
		let existingFolder;
		switch (updateType) {
			case 'set':
				existingFolder = divider.folders.find((f) =>
					f._id.equals(folder._id),
				);
				if (!existingFolder) {
					throw new Error('Folder not found');
				}
				updateOperation = {
					$set: { 'dividers.$[divider].folders.$[folder]': folder },
				};
				arrayFilters.push({ 'folder._id': folder._id });
				break;
			case 'push':
				if (
					divider.folders.some(
						(f) => f.folderName === folder.folderName,
					)
				) {
					throw new Error('Folder already exists');
				}
				updateOperation = {
					$push: { 'dividers.$[divider].folders': folder },
				};
				break;
			case 'pull':
				existingFolder = divider.folders.find((f) =>
					f._id.equals(folder._id),
				);
				if (!existingFolder) {
					throw new Error('Folder not found');
				}
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
		return updatedUser;
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
		const user = await findUser(username);
		if (!user) {
			throw new Error('User not found');
		}

		const divider = user.dividers.find(
			(d) => d.dividerName === dividerName,
		);
		if (!divider) {
			throw new Error('Divider not found');
		}

		const folder = divider.folders.find((f) => f.folderName === folderName);
		if (!folder) {
			throw new Error('Folder not found');
		}

		let updateOperation;
		let arrayFilters = [
			{ 'divider.dividerName': dividerName },
			{ 'folder.folderName': folderName },
		];
		let existingTask;
		switch (updateType) {
			case 'set':
				existingTask = folder.tasks.find((t) => t._id.equals(task._id));
				if (!existingTask) {
					throw new Error('Task not found');
				}
				updateOperation = {
					$set: {
						'dividers.$[divider].folders.$[folder].tasks.$[task]':
							task,
					},
				};
				arrayFilters.push({ 'task._id': task._id });
				break;
			case 'push':
				if (folder.tasks.some((t) => t.taskName === task.taskName)) {
					throw new Error('Folder already exists');
				}
				updateOperation = {
					$push: {
						'dividers.$[divider].folders.$[folder].tasks': task,
					},
				};
				break;
			case 'pull':
				existingTask = folder.tasks.find((t) => t._id.equals(task._id));
				if (!existingTask) {
					throw new Error('Task not found');
				}
				updateOperation = {
					$pull: {
						'dividers.$[divider].folders.$[folder].tasks': {
							_id: task._id,
						},
					},
					$set: {
						streak: user.streak + 1,
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
		return updatedUser;
	} catch (err) {
		console.error(err);
		return null;
	}
};

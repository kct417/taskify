import userModel from './user.js';

// user services are mongoose queries
// services should only be used in backend auth.js and fetch-users.js

export const addUser = (user) => {
	return userModel.create(user);
};

export const findUser = (username) => {
	return userModel.findOne({ username });
};

// push, pull, and update divider
// should check for existing user and divider
export const updateDividers = async (username, divider, updateType) => {
	try {
		// check for environment prerequisites
		const user = await findUser(username);
		if (!user) {
			throw new Error(`User '${username}' not found`);
		}

		let updateOperation;
		let arrayFilters = [];
		let existingDivider;
		switch (updateType) {
			// calls mongoose set method filtering by divider id
			case 'set':
				existingDivider = user.dividers.find((d) =>
					d._id.equals(divider._id),
				);
				if (!existingDivider) {
					throw new Error(
						`Divider '${divider.dividerName}' not found`,
					);
				}

				updateOperation = {
					$set: { 'dividers.$[divider]': divider },
				};

				arrayFilters.push({ 'divider._id': divider._id });
				break;
			// calls mongoose push method filtering by divider name
			case 'push':
				if (
					user.dividers.some(
						(d) => d.dividerName === divider.dividerName,
					)
				) {
					throw new Error(
						`Divider '${divider.dividerName}' already exists`,
					);
				}

				updateOperation = { $push: { dividers: divider } };
				break;
			// calls mongoose pull method filtering by divider id
			case 'pull':
				existingDivider = user.dividers.find((d) =>
					d._id.equals(divider._id),
				);
				if (!existingDivider) {
					throw new Error(`Divider ${divider.dividerName} not found`);
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

// push, pull, and update folder
// should check for existing user, divider, and folder
export const updateFolders = async (
	username,
	dividerName,
	folder,
	updateType,
) => {
	try {
		// check for environment prerequisites
		const user = await findUser(username);
		if (!user) {
			throw new Error(`User '${username}' not found`);
		}

		const divider = user.dividers.find(
			(d) => d.dividerName === dividerName,
		);
		if (!divider) {
			throw new Error(`Divider '${dividerName}' not found`);
		}

		let updateOperation;
		let arrayFilters = [{ 'divider.dividerName': dividerName }];
		let existingFolder;
		switch (updateType) {
			// calls mongoose set method filtering by folder id
			case 'set':
				existingFolder = divider.folders.find((f) =>
					f._id.equals(folder._id),
				);
				if (!existingFolder) {
					throw new Error(`Folder ${folder.folderName} not found`);
				}

				updateOperation = {
					$set: { 'dividers.$[divider].folders.$[folder]': folder },
				};

				arrayFilters.push({ 'folder._id': folder._id });
				break;
			// calls mongoose push method filtering by folder name
			case 'push':
				if (
					divider.folders.some(
						(f) => f.folderName === folder.folderName,
					)
				) {
					throw new Error(
						`Folder ${folder.folderName} already exists`,
					);
				}

				updateOperation = {
					$push: { 'dividers.$[divider].folders': folder },
				};
				break;
			// calls mongoose pull method filtering by folder id
			case 'pull':
				existingFolder = divider.folders.find((f) =>
					f._id.equals(folder._id),
				);
				if (!existingFolder) {
					throw new Error(`Folder ${folder.folderName} not found`);
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

// push, pull, and update task
// should check for existing user, divider, folder, and task
export const updateTasks = async (
	username,
	dividerName,
	folderName,
	task,
	updateType,
) => {
	try {
		// check for environment prerequisites
		const user = await findUser(username);
		if (!user) {
			throw new Error(`User '${username}' not found`);
		}

		const divider = user.dividers.find(
			(d) => d.dividerName === dividerName,
		);
		if (!divider) {
			throw new Error(`Divider '${dividerName}' not found`);
		}

		const folder = divider.folders.find((f) => f.folderName === folderName);
		if (!folder) {
			throw new Error(`Folder '${folderName}' not found`);
		}

		let updateOperation;
		let arrayFilters = [
			{ 'divider.dividerName': dividerName },
			{ 'folder.folderName': folderName },
		];
		let existingTask;
		switch (updateType) {
			// calls mongoose set method filtering by task id
			case 'set':
				existingTask = folder.tasks.find((t) => t._id.equals(task._id));
				if (!existingTask) {
					throw new Error(`Task ${task.taskName} not found`);
				}

				updateOperation = {
					$set: {
						'dividers.$[divider].folders.$[folder].tasks.$[task]':
							task,
					},
				};

				arrayFilters.push({ 'task._id': task._id });
				break;
			// calls mongoose push method filtering by task name
			case 'push':
				if (folder.tasks.some((t) => t.taskName === task.taskName)) {
					throw new Error(`Task ${task.taskName} already exists`);
				}

				updateOperation = {
					$push: {
						'dividers.$[divider].folders.$[folder].tasks': task,
					},
				};
				break;
			// calls mongoose pull method filtering by task id
			case 'pull':
				existingTask = folder.tasks.find((t) => t._id.equals(task._id));
				if (!existingTask) {
					throw new Error(`Task ${task.taskName} not found`);
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

import {
	findUser,
	updateDividers,
	updateFolders,
	updateTasks,
	updateStreakCount,
} from '../mongoose-database/services/user-services.js';

export const getDividers = (req, res) => {
	const { username } = req.params;
	findUser(username)
		.then((result) => {
			if (result) {
				res.status(200).send(result.dividers);
			} else {
				res.status(404).send('Resource not found.');
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

export const createDivider = (req, res) => {
	const { username } = req.params;
	const { divider } = req.body;
	updateDividers(username, divider, 'push')
		.then((result) => res.status(201).send(result.dividers))
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

export const deleteDivider = (req, res) => {
	const { username } = req.params;
	const { divider } = req.body;
	updateDividers(username, divider, 'pull')
		.then((result) => res.status(200).send(result.dividers))
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

export const setDivider = (req, res) => {
	const { username } = req.params;
	const { divider } = req.body;
	updateDividers(username, divider, 'set')
		.then((result) => res.status(200).send(result.dividers))
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

export const createFolder = (req, res) => {
	const { username, dividerName } = req.params;
	const { folder } = req.body;
	updateFolders(username, dividerName, folder, 'push')
		.then((result) => res.status(201).send(result.dividers))
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

export const deleteFolder = (req, res) => {
	const { username, dividerName } = req.params;
	const { folder } = req.body;
	updateFolders(username, dividerName, folder, 'pull')
		.then((result) => res.status(200).send(result.dividers))
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

export const setFolder = (req, res) => {
	const { username, dividerName } = req.params;
	const { folder } = req.body;
	updateFolders(username, dividerName, folder, 'set')
		.then((result) => res.status(200).send(result.dividers))
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

export const createTask = (req, res) => {
	const { username, dividerName, folderName } = req.params;
	const { task } = req.body;
	updateTasks(username, dividerName, folderName, task, 'push')
		.then((result) => res.status(201).send(result.dividers))
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

export const deleteTask = (req, res) => {
	const { username, dividerName, folderName } = req.params;
	const { task } = req.body;
	updateTasks(username, dividerName, folderName, task, 'pull')
		.then((result) => res.status(200).send(result.dividers))
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

export const setTask = (req, res) => {
	const { username, dividerName, folderName } = req.params;
	const { task } = req.body;
	updateTasks(username, dividerName, folderName, task, 'set')
		.then((result) => res.status(200).send(result.dividers))
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

export const getStreakCount = (req, res) => {
	const { username } = req.params;
	findUser(username)
		.then((result) => {
			if (result) {
				res.status(200).send({ streakCount: result.streakCount });
			} else {
				res.status(404).send('User not found.');
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

export const setStreakCount = async (req, res) => {
	const { username } = req.params;
	const { streakCount } = req.body;
	try {
		const result = await updateStreakCount(username, streakCount);
		if (result) {
			res.status(200).send(result);
		} else {
			res.status(404).send('User not found.');
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

export default {
	getDividers,
	createDivider,
	deleteDivider,
	setDivider,
	createFolder,
	deleteFolder,
	setFolder,
	createTask,
	deleteTask,
	setTask,
	getStreakCount,
	setStreakCount,
};

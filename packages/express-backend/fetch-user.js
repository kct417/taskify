import {
	findUser,
	updateDividers,
	updateFolders,
	updateTasks,
	// updateFolderOrder,
	// updateTaskOrder,
} from './user-services.js';

// functions to fetch user data based on api request
// used in backend index.js when routes are called

export const getDividers = (req, res) => {
	const { username } = req.params;
	// sends user dividers to frontend if successful
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
	// sends user dividers to frontend if successful
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
	// sends user dividers to frontend if successful
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
	// sends user dividers to frontend if successful
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
	// sends user dividers to frontend if successful
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
	// sends user dividers to frontend if successful
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
	// sends user dividers to frontend if successful
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
	// sends user dividers to frontend if successful
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
	// sends user dividers to frontend if successful
	updateTasks(username, dividerName, folderName, task, 'set')
		.then((result) => res.status(200).send(result.dividers))
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

export const getStreakCount = (req, res) => {
	const { username } = req.params;
	// sends user dividers to frontend if successful
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

// export const setFolderOrder = (req, res) => {
// 	const { username, dividerName } = req.params;
// 	const { folder, newIndex } = req.body;
// 	updateFolderOrder(username, dividerName, folder, newIndex)
// 		.then((result) => res.status(200).send(result.dividers))
// 		.catch((error) => {
// 			console.log(error);
// 			res.status(500).send(error);
// 		});
// };

// export const setTaskOrder = (req, res) => {
// 	const { username, dividerName, folderName } = req.params;
// 	const { task, newIndex } = req.body;
// 	updateTaskOrder(username, dividerName, folderName, task, newIndex)
// 		.then((result) => res.status(200).send(result.dividers))
// 		.catch((error) => {
// 			console.log(error);
// 			res.status(500).send(error);
// 		});
// };

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
};

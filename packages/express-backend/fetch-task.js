// All function are used index.js of the backend folder only

import {
	findUserByUsername,
	findDividerById,
	findFolderById,
	findTaskById,
	findTasks,
	addTask,
	deleteTaskById,
} from '../mongoose-database/services/task-services.js';

export function getUser(req, res) {
	const { username } = req.body;
	findUserByUsername(username)
		.then((result) => {
			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send('Resource not found.');
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
}

export function getDividers(req, res) {
	const { id } = req.body;
	findDividerById(id)
		.then((result) => {
			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send('Resource not found.');
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
}

export function getFolders(req, res) {
	const { id } = req.body;
	findFolderById(id)
		.then((result) => {
			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send('Resource not found.');
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
}

export function getTasks(req, res) {
	const { id } = req.body;
	findTaskById(id)
		.then((result) => {
			if (result) {
				res.status(200).send(result);
			} else {
				res.status(404).send('Resource not found.');
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
}

export function createTask(req, res) {
	const userToAdd = req.body;
	addTask(userToAdd)
		.then((result) => res.status(201).send(result))
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
}

export function deleteTask(req, res) {
	const idToDelete = req.params['id'];
	findTaskById(idToDelete)
		.then((result) => {
			if (result) {
				deleteTaskById(idToDelete).then(res.status(204).send());
			} else {
				res.status(404).send('Resource not found.');
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
}

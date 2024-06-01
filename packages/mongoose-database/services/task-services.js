import userModel from '../models/user.js';
import taskModel from '../models/task.js';
import folderModel from '../models/folder.js';
import dividerModel from '../models/dividers.js';

export function findUserByUsername(username) {
	return userModel.findOne({ username: username });
}

export function findDividerById(id) {
	return dividerModel.findById(id);
}

export function findFolderById(id) {
	return folderModel.findById(id);
}

export function findTaskById(id) {
	return taskModel.findById(id);
}

export function findTasks(id) {
	return taskModel.findById(id);
}

export function addTask(task) {
	const taskToAdd = new taskModel(task);
	return taskToAdd.save();
}

export function deleteTaskById(id) {
	return taskModel.findByIdAndDelete(id);
}

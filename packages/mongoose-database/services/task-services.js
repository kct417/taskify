import taskModel from '../models/task.js';

export function findTasks() {
	return taskModel.find();
}

export function addTask(task) {
	const taskToAdd = new taskModel(task);
	return taskToAdd.save();
}

export function findTaskById(id) {
	return taskModel.findById(id);
}

export function deleteTaskById(id) {
	return taskModel.findByIdAndDelete(id);
}

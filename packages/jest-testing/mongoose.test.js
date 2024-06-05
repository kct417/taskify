import mongoose from 'mongoose';

import userModel from '../mongoose-database/models/user.js';
import {
	addUser,
	findUser,
	updateDividers,
	updateFolders,
	updateTasks,
} from '../mongoose-database/services/user-services.js';

// tests for mongoose user model and user services

describe('User Services Success', () => {
	beforeAll(async () => {
		await mongoose.connect('mongodb://localhost:27017/testDB', {});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	beforeEach(async () => {
		const initialUserData = {
			username: 'Initial User',
			hashedPassword: 'Initial Password',
			dividers: [
				{
					dividerName: 'Initial Divider',
					folders: [
						{
							folderName: 'Initial Folder',
							tasks: [
								{
									taskName: 'Initial Task',
									description: 'Task description',
									completed: false,
								},
							],
						},
					],
				},
			],
		};

		await userModel.create(initialUserData);
	});

	afterEach(async () => {
		const collections = mongoose.connection.collections;
		for (const key in collections) {
			const collection = collections[key];
			await collection.deleteMany();
		}
	});

	describe('addUser', () => {
		it('should add a new user', async () => {
			const user = {
				username: 'New User',
				hashedPassword: 'New Password',
			};
			const addedUser = await addUser(user);
			expect(addedUser.username).toBe('New User');
		});
	});

	describe('findUser', () => {
		it('should find a user by username', async () => {
			const foundUser = await findUser('Initial User');
			expect(foundUser.username).toBe('Initial User');
		});
	});

	describe('updateDividers', () => {
		it('should push a divider into dividers array', async () => {
			const newDivider = { dividerName: 'New Divider' };

			const updatedUser = await updateDividers(
				'Initial User',
				newDivider,
				'push',
			);

			expect(
				updatedUser.dividers.some(
					(divider) =>
						divider.dividerName === 'New Divider' &&
						divider.id !== undefined,
				),
			).toBe(true);
		});

		it('should update dividers array using set', async () => {
			const initialUser = await findUser('Initial User');

			const dividerToUpdateId = initialUser.dividers[0]._id;

			const updatedDivider = {
				_id: dividerToUpdateId,
				dividerName: 'Updated Divider',
			};

			const updatedUser = await updateDividers(
				'Initial User',
				updatedDivider,
				'set',
			);

			expect(
				updatedUser.dividers.some(
					(divider) =>
						divider._id.equals(updatedDivider._id) &&
						divider.dividerName === 'Updated Divider',
				),
			).toBe(true);
		});

		it('should pull a divider from dividers array', async () => {
			const initialUser = await findUser('Initial User');

			const dividerToDeleteId = initialUser.dividers[0]._id;

			const deletedDivider = {
				_id: dividerToDeleteId,
			};

			const updatedUser = await updateDividers(
				'Initial User',
				deletedDivider,
				'pull',
			);

			expect(
				updatedUser.dividers.some((divider) =>
					divider._id.equals(deletedDivider._id),
				),
			).toBe(false);
		});
	});

	describe('updateFolders', () => {
		it('should push a folder into folders array in a specific divider', async () => {
			const newFolder = { folderName: 'New Folder' };

			const updatedUser = await updateFolders(
				'Initial User',
				'Initial Divider',
				newFolder,
				'push',
			);
			expect(
				updatedUser.dividers[0].folders.some(
					(folder) =>
						folder.folderName === 'New Folder' &&
						folder.id !== undefined,
				),
			).toBe(true);
		});

		it('should update folders array in a specific divider using set', async () => {
			const initialUser = await findUser('Initial User');

			const folderToUpdateId = initialUser.dividers[0].folders[0]._id;

			const updatedFolder = {
				_id: folderToUpdateId,
				folderName: 'Updated Folder',
			};

			const updatedUser = await updateFolders(
				'Initial User',
				'Initial Divider',
				updatedFolder,
				'set',
			);

			expect(
				updatedUser.dividers[0].folders.some(
					(folder) =>
						folder._id.equals(updatedFolder._id) &&
						folder.folderName === 'Updated Folder',
				),
			).toBe(true);
		});

		it('should pull a folder from folders array in a specific divider', async () => {
			const initialUser = await findUser('Initial User');

			const folderToDeleteId = initialUser.dividers[0].folders[0]._id;

			const deletedFolder = {
				_id: folderToDeleteId,
			};

			const updatedUser = await updateFolders(
				'Initial User',
				'Initial Divider',
				folderToDeleteId,
				'pull',
			);

			expect(
				updatedUser.dividers[0].folders.some((folder) =>
					folder._id.equals(deletedFolder._id),
				),
			).toBe(false);
		});
	});

	describe('updateTasks', () => {
		it('should push a task into tasks array in a specific folder', async () => {
			const newTask = { taskName: 'New Task' };

			const updatedUser = await updateTasks(
				'Initial User',
				'Initial Divider',
				'Initial Folder',
				newTask,
				'push',
			);
			expect(
				updatedUser.dividers[0].folders[0].tasks.some(
					(task) => task.taskName === 'New Task',
				),
			);

			expect(
				updatedUser.dividers[0].folders[0].tasks.some(
					(task) =>
						task.taskName === 'New Task' && task.id !== undefined,
				),
			).toBe(true);
		});

		it('should update tasks array in a specific folder using set', async () => {
			const initialUser = await findUser('Initial User');

			const taskToUpdateId =
				initialUser.dividers[0].folders[0].tasks[0]._id;

			const updatedTask = {
				_id: taskToUpdateId,
				taskName: 'Updated Task',
			};

			const updatedUser = await updateTasks(
				'Initial User',
				'Initial Divider',
				'Initial Folder',
				updatedTask,
				'set',
			);

			expect(
				updatedUser.dividers[0].folders[0].tasks.some(
					(task) =>
						task._id.equals(updatedTask._id) &&
						task.taskName === 'Updated Task',
				),
			).toBe(true);
		});

		it('should pull a task from tasks array in a specific folder', async () => {
			const initialUser = await findUser('Initial User');

			const taskToDeleteId =
				initialUser.dividers[0].folders[0].tasks[0]._id;

			const deletedTask = {
				_id: taskToDeleteId,
			};

			const updatedUser = await updateTasks(
				'Initial User',
				'Initial Divider',
				'Initial Folder',
				deletedTask,
				'pull',
			);

			expect(
				updatedUser.dividers[0].folders[0].tasks.some((task) =>
					task._id.equals(deletedTask._id),
				),
			).toBe(false);
		});
	});
});

describe('User Services Error', () => {
	beforeAll(async () => {
		await mongoose.connect('mongodb://localhost:27017/testDB', {});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	beforeEach(async () => {
		const initialUserData = {
			username: 'Initial User',
			hashedPassword: 'Initial Password',
			dividers: [
				{
					dividerName: 'Initial Divider',
					folders: [
						{
							folderName: 'Initial Folder',
							tasks: [
								{
									taskName: 'Initial Task',
									description: 'Task description',
									completed: false,
								},
							],
						},
					],
				},
			],
		};

		await userModel.create(initialUserData);
	});

	afterEach(async () => {
		const collections = mongoose.connection.collections;
		for (const key in collections) {
			const collection = collections[key];
			await collection.deleteMany();
		}
	});

	describe('updateDividers', () => {
		it('should return null when updating dividers for a non-existing user', async () => {
			const newDivider = { dividerName: 'New Divider' };

			const updatedUser = await updateDividers(
				'Non-existing User',
				newDivider,
				'push',
			);

			expect(updatedUser).toBeNull();
		});

		it('should handle invalid update type in updateDividers', async () => {
			const newDivider = { dividerName: 'New Divider' };
			const invalidUpdateType = 'invalidType';

			const updatedUser = await updateDividers(
				'Initial User',
				newDivider,
				invalidUpdateType,
			);

			expect(updatedUser).toBeNull();
		});

		it('should not add a divider with a duplicate name', async () => {
			const newDivider = { dividerName: 'Initial Divider' };

			const updatedUser = await updateDividers(
				'Initial User',
				newDivider,
				'push',
			);

			expect(updatedUser).toBeNull();
		});

		it('should not update a non-existing divider', async () => {
			const updatedDivider = {
				dividerName: 'Non-existing Divider',
			};

			const updatedUser = await updateDividers(
				'Initial User',
				updatedDivider,
				'set',
			);

			expect(updatedUser).toBeNull();
		});

		it('should not delete a non-existing divider', async () => {
			const updatedDivider = {
				dividerName: 'Non-existing Divider',
			};

			const updatedUser = await updateDividers(
				'Initial User',
				updatedDivider,
				'pull',
			);

			expect(updatedUser).toBeNull();
		});
	});

	describe('updateFolders', () => {
		it('should return null when updating folders for a non-existing user', async () => {
			const newFolder = { folderName: 'New Folder' };

			const updatedUser = await updateFolders(
				'Non-existing User',
				'Initial Divider',
				newFolder,
				'push',
			);

			expect(updatedUser).toBeNull();
		});

		it('should return null when updating folders for a non-existing divider', async () => {
			const newFolder = { folderName: 'New Folder' };

			const updatedUser = await updateFolders(
				'Initial User',
				'Non-existing Divider',
				newFolder,
				'push',
			);

			expect(updatedUser).toBeNull();
		});

		it('should handle invalid update type in updateFolders', async () => {
			const newFolder = { folderName: 'New Folder' };
			const invalidUpdateType = 'invalidType';

			const updatedUser = await updateFolders(
				'Initial User',
				'Initial Divider',
				newFolder,
				invalidUpdateType,
			);

			expect(updatedUser).toBeNull();
		});

		it('should not add a folder with a duplicate name in the same divider', async () => {
			const newFolder = { folderName: 'Initial Folder' };

			const updatedUser = await updateFolders(
				'Initial User',
				'Initial Divider',
				newFolder,
				'push',
			);

			expect(updatedUser).toBeNull();
		});

		it('should not update a non-existing folder', async () => {
			const updatedFolder = {
				folderName: 'Non-existing Folder',
			};

			const updatedUser = await updateFolders(
				'Initial User',
				'Initial Divider',
				updatedFolder,
				'set',
			);

			expect(updatedUser).toBeNull();
		});

		it('should not delete a non-existing folder', async () => {
			const updatedFolder = {
				folderName: 'Non-existing Folder',
			};

			const updatedUser = await updateFolders(
				'Initial User',
				'Initial Divider',
				updatedFolder,
				'pull',
			);

			expect(updatedUser).toBeNull();
		});
	});

	describe('updateTasks', () => {
		it('should return null when updating tasks for a non-existing user', async () => {
			const newTask = { taskName: 'New Task' };

			const updatedUser = await updateTasks(
				'Non-existing User',
				'Initial Divider',
				'Initial Folder',
				newTask,
				'push',
			);

			expect(updatedUser).toBeNull();
		});

		it('should return null when updating tasks for a non-existing divider', async () => {
			const newTask = { taskName: 'New Task' };

			const updatedUser = await updateTasks(
				'Initial User',
				'Non-existing Divider',
				'Initial Folder',
				newTask,
				'push',
			);

			expect(updatedUser).toBeNull();
		});

		it('should return null when updating tasks for a non-existing folder', async () => {
			const newTask = { taskName: 'New Task' };

			const updatedUser = await updateTasks(
				'Initial User',
				'Initial Divider',
				'Non-existing Folder',
				newTask,
				'push',
			);

			expect(updatedUser).toBeNull();
		});

		it('should handle invalid update type in updateTasks', async () => {
			const newTask = { taskName: 'New Task' };
			const invalidUpdateType = 'invalidType';

			const updatedUser = await updateTasks(
				'Initial User',
				'Initial Divider',
				'Initial Folder',
				newTask,
				invalidUpdateType,
			);

			expect(updatedUser).toBeNull();
		});

		it('should not add a task with a duplicate name in the same folder', async () => {
			const newTask = { taskName: 'Initial Task' };

			const updatedUser = await updateTasks(
				'Initial User',
				'Initial Divider',
				'Initial Folder',
				newTask,
				'push',
			);

			expect(updatedUser).toBeNull();
		});

		it('should not update a non-existing task', async () => {
			const updatedTask = {
				taskName: 'Non-existing Task',
			};

			const updatedUser = await updateTasks(
				'Initial User',
				'Initial Divider',
				'Initial Folder',
				updatedTask,
				'set',
			);

			expect(updatedUser).toBeNull();
		});

		it('should not delete a non-existing task', async () => {
			const updatedTask = {
				taskName: 'Non-existing Task',
			};

			const updatedUser = await updateTasks(
				'Initial User',
				'Initial Divider',
				'Initial Folder',
				updatedTask,
				'pull',
			);

			expect(updatedUser).toBeNull();
		});
	});
});

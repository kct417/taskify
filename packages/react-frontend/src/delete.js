import { API_PREFIX } from './constants';

// deletes a task from a given user's divider's folder and updates client's state
async function deleteTask(
	task,
	user,
	dividerName,
	folderName,
	updateUser,
	showBanner,
) {
	try {
		const response = await fetch(
			`${API_PREFIX}/${user.username}/${dividerName}/${folderName}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({ task: task }),
			},
		);
		if (response.ok) {
			// refresh tasks after deletion
			const updatedUserResponse = await fetch(
				`${API_PREFIX}/${user.username}`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				},
			);
			const updatedUserData = await updatedUserResponse.json();
			// update local state to reflect server changes
			updateUser(
				user.token,
				user.username,
				user.streak + 1,
				updatedUserData,
			);
		} else {
			throw new Error(response.statusText);
		}
	} catch (error) {
		console.error('Error deleting task:', error);
		showBanner('Oop!', 'There was an issue removing the task.', 'danger');
	}
}

export { deleteTask };

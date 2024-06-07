import express from 'express';
import cors from 'cors';

import './connect-database.js';
import User from './fetch-user.js';
import { registerUser, loginUser, authenticateUser } from './auth-user.js';

// available routes for the frontend

const corsOptions = {
	origin: 'https://thankful-smoke-0f194be1e.5.azurestaticapps.net',
	optionsSuccessStatus: 200,
};

const app = express();
const port = 8000;

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/signup', registerUser);
app.post('/login', loginUser);

app.get('/:username', authenticateUser, User.getDividers);

app.post('/:username', authenticateUser, User.createDivider);
app.post('/:username/:dividerName', authenticateUser, User.createFolder);
app.post(
	'/:username/:dividerName/:folderName',
	authenticateUser,
	User.createTask,
);

app.delete('/:username', authenticateUser, User.deleteDivider);
app.delete('/:username/:dividerName', authenticateUser, User.deleteFolder);
app.delete(
	'/:username/:dividerName/:folderName',
	authenticateUser,
	User.deleteTask,
);

app.put('/:username', authenticateUser, User.setDivider);
app.put('/:username/:dividerName', authenticateUser, User.setFolder);
app.put('/:username/:dividerName/:folderName', authenticateUser, User.setTask);

app.listen(process.env.PORT || port, () => {
	console.log(`REST API is listening.`);
});

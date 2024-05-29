import express from 'express';
import cors from 'cors';

import '../mongoose-database/index.js';
import User from './fetch-user.js';
import { registerUser, loginUser, authenticateUser } from './auth-user.js';

const app = express();
const port = 8000;
const API_PREFIX = `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.post('/signup', registerUser);
app.post('/login', loginUser);

app.get('/:user', authenticateUser, User.getUser);

app.post('/:user', authenticateUser, User.createDivider);
app.post('/:user/:divider', authenticateUser, User.createFolder);
app.post('/:user/:divider/:folder', authenticateUser, User.createTask);

app.delete('/:user', authenticateUser, User.deleteDivider);
app.delete('/:user/:divider', authenticateUser, User.deleteFolder);
app.delete('/:user/:divider/:folder', authenticateUser, User.deleteTask);

app.put('/:user', authenticateUser, User.setDivider);
app.put('/:user/:divider', authenticateUser, User.setFolder);
app.put('/:user/:divider/:folder', authenticateUser, User.setTask);

// Routes without authentication for testing
// Overrides previous route due to redeclaration after

app.get('/:user', User.getUser);

app.post('/:user', User.createDivider);
app.post('/:user/:divider', User.createFolder);
app.post('/:user/:divider/:folder', User.createTask);

app.delete('/:user', User.deleteDivider);
app.delete('/:user/:divider', User.deleteFolder);
app.delete('/:user/:divider/:folder', User.deleteTask);

app.put('/:user', User.setDivider);
app.put('/:user/:divider', User.setFolder);
app.put('/:user/:divider/:folder', User.setTask);

app.listen(port, () => {
	console.log(`Example app listening at ${API_PREFIX}`);
});

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
	addUser,
	findUser,
} from '../mongoose-database/services/user-services.js';

export async function registerUser(req, res) {
	const { firstName, lastName, username, password } = req.body;

	try {
		if (!username || !password) {
			return res.status(400).send('Bad request: Invalid input data.');
		}

		const userExists = await findUser(username);
		if (userExists) {
			return res.status(409).send('Username already taken');
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const token = await generateAccessToken(username);
		console.log('Token:', token);

		const userToAdd = {
			firstName: firstName,
			lastName: lastName,
			username: username,
			hashedPassword: hashedPassword,
			dividers: [
				{
					dividerName: 'General',
					folders: [{ folderName: 'General' }],
				},
			],
		};
		await addUser(userToAdd);

		return res.status(201).send({ token: token, username: username });
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal Server Error');
	}
}

export async function loginUser(req, res) {
	const { username, password } = req.body;

	try {
		const retrievedUser = await findUser(username);

		if (!retrievedUser) {
			return res
				.status(401)
				.send('Unauthorized: Invalid username or password');
		}

		const matched = await bcrypt.compare(
			password,
			retrievedUser.hashedPassword,
		);
		if (matched) {
			const token = await generateAccessToken(username);
			console.log('Token:', token);
			return res.status(200).send({ token: token, username: username });
		} else {
			return res
				.status(401)
				.send('Unauthorized: Invalid username or password');
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal Server Error');
	}
}

export function authenticateUser(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		console.log('No token received');
		res.status(401).end();
	} else {
		jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
			if (decoded) {
				req.body['username'] = decoded.username;
				req.body['dividers'] = decoded.dividers;
				next();
			} else {
				console.log('JWT error:', error);
				res.status(401).end();
			}
		});
	}
}

function generateAccessToken(username) {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ username: username },
			process.env.TOKEN_SECRET,
			{ expiresIn: '1d' },
			(error, token) => {
				if (error) {
					reject(error);
				} else {
					resolve(token);
				}
			},
		);
	});
}

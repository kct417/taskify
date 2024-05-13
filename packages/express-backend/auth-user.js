import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
	addUser,
	findUserByName,
} from '../mongoose-database/services/user-services.js';

export async function registerUser(req, res) {
	const { username, password } = req.body; // from form

	try {
		if (!username || !password) {
			return res.status(400).send('Bad request: Invalid input data.');
		}

		const userExists = await findUserByName(username);
		if (userExists) {
			return res.status(409).send('Username already taken');
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const token = await generateAccessToken(username);
		console.log('Token:', token);

		const userToAdd = {
			username: username,
			hashedPassword: hashedPassword,
		};
		await addUser(userToAdd);

		return res.status(201).send({ token: token });
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal Server Error');
	}
}

// export function registerUser(req, res) {
// 	const { username, password } = req.body; // from form

// 	if (!username || !password) {
// 		res.status(400).send('Bad request: Invalid input data.');
// 	} else {
// 		userModel
// 			.exists({ username: username })
// 			.then((userExists) => {
// 				if (userExists) {
// 					res.status(409).send('Username already taken');
// 				} else {
// 					bcrypt
// 						.genSalt(10)
// 						.then((salt) => bcrypt.hash(password, salt))
// 						.then((hashedPassword) => {
// 							return generateAccessToken(username).then(
// 								(token) => {
// 									console.log('Token:', token);
// 									const userToAdd = new userModel({
// 										username: username,
// 										hashedPassword: hashedPassword,
// 									});
// 									return userToAdd.save().then(() => {
// 										res.status(201).send({ token: token });
// 									});
// 								},
// 							);
// 						})
// 						.catch((error) => {
// 							console.error(error);
// 							res.status(500).send('Internal Server Error');
// 						});
// 				}
// 			})
// 			.catch((error) => {
// 				console.error(error);
// 				res.status(500).send('Internal Server Error');
// 			});
// 	}
// }

export async function loginUser(req, res) {
	const { username, password } = req.body; // from form

	try {
		const retrievedUser = await findUserByName(username);

		if (!retrievedUser) {
			// invalid username
			return res.status(401).send('Unauthorized');
		}

		const matched = await bcrypt.compare(
			password,
			retrievedUser.hashedPassword,
		);
		if (matched) {
			const token = await generateAccessToken(username);
			console.log('Token:', token);
			return res.status(200).send({ token: token });
		} else {
			// invalid password
			return res.status(401).send('Unauthorized');
		}
	} catch (error) {
		console.error(error);
		return res.status(401).send('Unauthorized');
	}
}

// export function loginUser(req, res) {
// 	const { username, password } = req.body; // from form
// 	userModel
// 		.findOne({ username: username })
// 		.lean()
// 		.then((retrievedUser) => {
// 			if (!retrievedUser) {
// 				// invalid username
// 				res.status(401).send('Unauthorized');
// 			} else {
// 				bcrypt
// 					.compare(password, retrievedUser.hashedPassword)
// 					.then((matched) => {
// 						if (matched) {
// 							generateAccessToken(username).then((token) => {
// 								console.log('Token:', token);
// 								res.status(200).send({ token: token });
// 							});
// 						} else {
// 							// invalid password
// 							res.status(401).send('Unauthorized');
// 						}
// 					})
// 					.catch((error) => {
// 						res.status(401).send('Unauthorized');
// 						console.log(error);
// 					});
// 			}
// 		})
// 		.catch((error) => {
// 			res.status(401).send('Unauthorized');
// 			console.log(error);
// 		});
// }

export function authenticateUser(req, res, next) {
	const authHeader = req.headers['authorization'];
	//Getting the 2nd part of the auth header (the token)
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		console.log('No token received');
		res.status(401).end();
	} else {
		jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
			if (decoded) {
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

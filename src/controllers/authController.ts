import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../entities/interfaces';
import { UserModel } from '../entities/models';
import 'dotenv/config';
import { Request, Response } from 'express';

const saltRounds = 10;
export const authController = {
	create: async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

			if (email === undefined || password === undefined) {
				return res.status(400).send('email or password missing');
			}

			UserModel.getOne(email).then((result) => {
				if (result) {
					return res.status(409).send('This email is already registered');
				} else {
					bcrypt
						.hash(password, saltRounds)
						.then(async (result) => {
							const hashedPassword: String = result;
							await UserModel.createOne(email, hashedPassword as string);
							res.sendStatus(200);
						})
						.catch((err) => {
							console.log(err);
						});
				}
			});
		} catch (error) {
			console.log(error);
		}
	},

	signIn: async (req: Request, res: Response) => {
		const { email, password } = req.body;

		if (email == undefined || password == undefined) {
			return res.status(400).send('Email or Password missing');
		}

		const user: IUser | null = await UserModel.getOne(email);

		if (user) {
			const match = await bcrypt.compare(password, user.password);

			if (match) {
				const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY as string, {
					expiresIn: '1y',
				});
				res.status(200).json(token);
			} else {
				res.sendStatus(401);
			}
		} else {
			res.sendStatus(401);
		}
	},
};

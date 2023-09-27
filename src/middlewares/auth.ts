import { jwtTransactions } from '../helper/jwt';
const verifyToken = jwtTransactions.verifyToken;
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { log } from 'console';

export const auhtMw = {
	signIn: (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;
		if (!email || !password) return res.sendStatus(400);
		next();
	},
	authenticated: (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization;

		authHeader
			? verifyToken(authHeader.split(' ')[1], process.env.SECRET_KEY)
					.then((result: any) => {
						result
							? (() => {
									res.locals.user = result;
									next();
							  })()
							: res.sendStatus(403);
					})
					.catch((error: any) => {
						res.status(500).send(error);
					})
			: res.sendStatus(403);
	},
};

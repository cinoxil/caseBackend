import jwt from 'jsonwebtoken';

function getVerifyToken(token: any, secret: any) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, function (err: any, decoded: any) {
			if (err) {
				resolve(false);
			}
			resolve(decoded);
		});
		reject();
	});
}

function getToken(data: any, secret: any, time: any) {
	return new Promise((resolve, reject) => {
		resolve(
			jwt.sign(
				{
					data: data,
				},
				secret,
				{ expiresIn: time }
			)
		);
	});
}

export const jwtTransactions = {
	createToken: async (data: any, secret: any, time: any) => {
		return await getToken(data, secret, time);
	},
	verifyToken: async (token: any, secret: any) => {
		return await getVerifyToken(token, secret);
	},
};

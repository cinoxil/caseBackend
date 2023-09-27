import mongoose from 'mongoose';
import { IUser } from '../interfaces';

const userSchema: mongoose.Schema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export class UserModel {
	static async getOne(email: string): Promise<IUser | null> {
		try {
			return await User.findOne({ email });
		} catch (err) {
			throw new Error(`Error: ${err}`);
		}
	}

	static async createOne(email: string, password: string): Promise<IUser> {
		try {
			return await User.create({ email, password });
		} catch (err) {
			throw new Error(`Error: ${err}`);
		}
	}
}

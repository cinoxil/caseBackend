import mongoose, { Types } from 'mongoose';
import { IProduct } from '../interfaces';
import { Category } from '../enums';

const userSchema: mongoose.Schema = new mongoose.Schema({
	name: { type: String, required: true },
	category: { type: Array<Category>, required: true },
	amount: { type: Number, required: true },
	amountUnit: { type: String, required: true },
	company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
});

export const Product = mongoose.model<IProduct>('Product', userSchema);

export class ProductModel {
	static async createOne(data: IProduct): Promise<IProduct> {
		try {
			return await Product.create(data);
		} catch (err) {
			throw new Error(`Error: ${err}`);
		}
	}
	static async getOne(name: string): Promise<IProduct | null> {
		try {
			return await Product.findOne({ name }).populate('company');
		} catch (err) {
			throw new Error(`Error: ${err}`);
		}
	}

	static async listAll(): Promise<Array<IProduct> | null> {
		try {
			return await Product.find().populate('company');
		} catch (err) {
			throw new Error(`Error: ${err}`);
		}
	}

	static async remove(name: string): Promise<IProduct | null | undefined> {
		try {
			return await Product.findOneAndDelete({ name: name });
		} catch (err) {
			throw new Error(`Error: ${err}`);
		}
	}

	static async edit(data: IProduct): Promise<IProduct | null> {
		try {
			return await Product.findByIdAndUpdate(data._id, data);
		} catch (err) {
			throw new Error(`Error: ${err}`);
		}
	}
}

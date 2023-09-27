import mongoose, { Types } from 'mongoose';
import { ICompany } from '../interfaces';
import { Country } from '../enums';

const userSchema: mongoose.Schema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		legalNumber: { type: Number, required: true, unique: true },
		regions: { type: Array<Country>, required: true },
		website: { type: String },
		numberOfEmployees: { type: Number, required: true },
		companyValue: { type: Number, required: true },
		profitabilityByYears: { type: Array<Record<string, number>> },
		numberOfEmployeesByYears: { type: Array<Record<string, number>> },
	},
	{ timestamps: true }
);

const Company = mongoose.model<ICompany>('Company', userSchema);

export class CompanyModel {
	static async createOne(data: ICompany): Promise<ICompany> {
		try {
			return await Company.create(data);
		} catch (err) {
			throw new Error(`Error: ${err}`);
		}
	}
	static async getOne(name: string): Promise<ICompany | null> {
		try {
			return await Company.findOne({ name });
		} catch (err) {
			throw new Error(`Error: ${err}`);
		}
	}

	static async listAll(): Promise<Array<ICompany> | null> {
		try {
			return await Company.find().sort({ createdAt: 'desc' });
		} catch (err) {
			throw new Error(`Error: ${err}`);
		}
	}

	static async firstThree(): Promise<Array<ICompany> | null> {
		try {
			return await Company.find({ followedBy: { $slice: 3 } }).sort({ createdAt: 'desc' });
		} catch (err) {
			throw new Error(`Error: ${err}`);
		}
	}

	static async remove(_id: Types.ObjectId): Promise<ICompany | null | undefined> {
		try {
			return await Company.findByIdAndDelete(_id);
		} catch (err) {
			throw new Error(`Error: ${err}`);
		}
	}

	static async edit(data: ICompany): Promise<ICompany | null> {
		try {
			return await Company.findByIdAndUpdate(data._id, data);
		} catch (err) {
			throw new Error(`Error: ${err}`);
		}
	}
}

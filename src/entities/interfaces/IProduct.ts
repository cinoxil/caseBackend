import { Category } from '../enums';
import { ICompany } from './ICompany';
import { Types } from 'mongoose';

export interface IProduct {
	_id: Types.ObjectId;
	name: string;
	category: Category;
	amount: number;
	amountUnit: string;
	company: ICompany;
}

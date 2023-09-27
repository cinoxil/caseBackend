import { Types } from 'mongoose';
import { Country } from '../enums';

export interface ICompany {
	_id: Types.ObjectId;
	name: string;
	legalNumber: number;
	regions: Array<Country>;
	website: string;
	numberOfEmployees: number;
	companyValue: number;
	profitabilityByYears: Array<Record<string, number>>;
	numberOfEmployeesByYears: Array<Record<string, number>>;
}

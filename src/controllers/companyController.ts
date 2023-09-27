import { CompanyModel } from '../entities/models';
import 'dotenv/config';
import { Request, Response } from 'express';
import { ICompany } from '../entities/interfaces/';

export const companyController = {
	create: async (req: Request, res: Response) => {
		try {
			const data: ICompany = req.body as ICompany;
			console.log('create controller');

			const result = await CompanyModel.createOne(data);

			result
				? res.status(201).send('Company registration successful')
				: res.status(500).send('There is something wrong when registering company');
		} catch (error) {
			console.log(error);
		}
	},

	getOne: async (req: Request, res: Response) => {
		const name = req.query.name as string;

		const data: ICompany | null = await CompanyModel.getOne(name);

		data ? res.json(data) : res.status(404).send('Couldnt found');
	},

	listAll: async (req: Request, res: Response) => {
		const data: Array<ICompany> | null = await CompanyModel.listAll();

		data ? res.json(data) : res.status(404).send('Couldnt found');
	},

	firstThree: async (req: Request, res: Response) => {
		const data: Array<ICompany> | null = await CompanyModel.firstThree();

		data ? res.json(data) : res.status(404).send('Couldnt found');
	},

	remove: async (req: Request, res: Response) => {
		const { id } = req.body;

		const data: ICompany | null | undefined = await CompanyModel.remove(id);

		data ? res.status(200).send('Removed succesfully') : res.status(500).send('Something went wrong');
	},

	edit: async (req: Request, res: Response) => {
		const data: ICompany = req.body as ICompany;

		const result: ICompany | null | undefined = await CompanyModel.edit(data);

		console.log(data);

		data ? res.status(200).json(result) : res.status(500).send('Something went wrong');
	},
};

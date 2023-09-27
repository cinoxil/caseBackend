import { ProductModel } from '../entities/models';
import { Request, Response } from 'express';
import { IProduct } from '../entities/interfaces';

export const productController = {
	create: async (req: Request, res: Response) => {
		try {
			const data = req.body;
			console.log('create controller');
			const result = await ProductModel.createOne(data);
			result
				? res.status(201).send('Product registration successful')
				: res.status(500).send('There is something wrong when registering product');
		} catch (error) {
			console.log(error);
		}
	},
	getOne: async (req: Request, res: Response) => {
		const name = req.query.name as string;
		const data = await ProductModel.getOne(name);
		data ? res.json(data) : res.status(404).send('Couldnt found');
	},
	listAll: async (req: Request, res: Response) => {
		const data = await ProductModel.listAll();
		data ? res.json(data) : res.status(404).send('Couldnt found');
	},
	remove: async (req: Request, res: Response) => {
		const { name } = req.body;
		const data = await ProductModel.remove(name);
		data ? res.status(200).send('Removed succesfull') : res.status(500).send('Something went wrong');
	},
	edit: async (req: Request, res: Response) => {
		const data = req.body as IProduct;
		const result: IProduct | null | undefined = await ProductModel.edit(data);
		data ? res.status(200).json(result) : res.status(500).send('Something went wrong');
	},
};

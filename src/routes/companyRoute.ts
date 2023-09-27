import express from 'express';
import { auhtMw } from '../middlewares/auth';
import { companyController } from '../controllers/companyController';
const companyRoute = express.Router();

companyRoute.post('/create', auhtMw.authenticated, companyController.create);
companyRoute.get('/getone', auhtMw.authenticated, companyController.getOne);
companyRoute.get('/listall', companyController.listAll);
companyRoute.get('/firstthree', auhtMw.authenticated, companyController.firstThree);
companyRoute.post('/delete', auhtMw.authenticated, companyController.remove);
companyRoute.post('/edit', auhtMw.authenticated, companyController.edit);

export default companyRoute;

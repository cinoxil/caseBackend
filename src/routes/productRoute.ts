import express from 'express';
import { auhtMw } from '../middlewares/auth';
import { productController } from '../controllers/productController';
const productRoute = express.Router();

productRoute.post('/create', auhtMw.authenticated, productController.create);
productRoute.get('/getone', auhtMw.authenticated, productController.getOne);
productRoute.get('/listall', productController.listAll);
productRoute.post('/delete', auhtMw.authenticated, productController.remove);
productRoute.post('/edit', auhtMw.authenticated, productController.edit);

export default productRoute;

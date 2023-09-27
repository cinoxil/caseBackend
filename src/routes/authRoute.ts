import express from 'express';
import { auhtMw } from '../middlewares/auth';
import { authController } from '../controllers/authController';
const authRoute = express.Router();

authRoute.post('/register', authController.create);
authRoute.post('/login', auhtMw.signIn, authController.signIn);

export default authRoute;

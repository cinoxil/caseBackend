import express from 'express';
const app = express();
import mongoose from 'mongoose';
import 'dotenv/config';
import authRoute from './routes/authRoute';
import companyRoute from './routes/companyRoute';
import productRoute from './routes/productRoute';
import cors from 'cors';

const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());

app.use('/', authRoute);
app.use('/company', companyRoute);
app.use('/product', productRoute);

mongoose
	.connect(process.env.MONGO_URI as string)
	.then(() => {
		console.log('MongoDB Connected');
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(port, () => {
	console.log(`Server running on ${port}`);
});

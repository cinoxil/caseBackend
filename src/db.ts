// import { MongoClient } from 'mongodb';
// import 'dotenv/config';
//
// const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
// console.log(uri);
// const client = new MongoClient(uri, { auth: { username: 'admin', password: 'admin' } });
//
// async function connect() {
// 	try {
// 		await client.connect();
// 		console.log('Connected to MongoDB');
// 	} catch (error) {
// 		console.error('Error connecting to MongoDB', error);
// 	}
// }
//
// process.on('SIGINT', () => {
// 	client.close().then(() => {
// 		console.log('MongoDB connection closed.');
// 		process.exit(0);
// 	});
// });
//
// export { client, connect };

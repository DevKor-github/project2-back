import express from 'express';
import helmet from 'helmet';
import http from 'http';

import dataSource from './config/dataSource.js'; //loadExpressApp의 connectDB에서 폴더 안에 넣도록 한다. 
// 자세한 설정은 폴더 config > datasource의 const datasource에서 수행한다. 
import router from './router/index.js';
import errorHandler from './middlewares/errorHandler.js';

const connectDB = async () => {
	try {
		await dataSource.initialize();
		console.log('DB connected!');
	} catch (err) {
		console.error(err);
	}
};

// http에서 요청이 오면, 순서대로 처리한다.
const loadExpressApp = async () => {
	await connectDB();
	const app = express(); //간단한 설정들.
	app.use(helmet()); 
	app.use(express.json()); //서버에서 json이라는 파일 형식들을 쓸 수 있게 해준다. 
	app.enable('trust proxy'); 

	app.use(router);
	app.use(errorHandler); //next(err)을 통해, errorhandler로 보내진다. 
	app.all('*', (_, res) => {
		res.status(404).json({
			data: null,
			error: {
				message: 'URL Not Found',//지정하지 않은 것에 대해서는 404 error을 실행한다. 
			},
		});
	});
	return app;
};

const createServer = async () => {
	const app = await loadExpressApp();
	const server = http.createServer(app);
	const port = process.env.PORT || 8080; //지정한 번호로 서버를 돌린다. 

	server.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
};

createServer()
	.then(() => {
		console.log('Server started!');
	})
	.catch((err) => {
		console.error(err);
	});

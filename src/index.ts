import express from 'express';
import helmet from 'helmet';
import http from 'http';

import dataSource from './config/dataSource';
import router from './router/index';
import errorHandler from './middlewares/errorHandler';
import { authChecker } from './middlewares/auth';

const connectDB = async () => {
  try {
    await dataSource.initialize();
    console.log('DB connected!');
  } catch (err) {
    console.error(err);
  }
};
const a = 1;
const loadExpressApp = async () => {
  await connectDB();
  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.enable('trust proxy');

  app.use(authChecker);
  app.use(router);
  app.use(errorHandler);
  app.all('*', (_, res) => {
    res.status(404).json({
      data: null,
      error: {
        message: 'URL Not Found',
      },
    });
  });
  return app;
};

const createServer = async () => {
  const app = await loadExpressApp();
  const server = http.createServer(app);
  const port = process.env.PORT || 8080;

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

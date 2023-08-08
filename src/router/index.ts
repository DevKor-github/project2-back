import * as express from 'express';

import postRouter from './post';

const router = express.Router();

router.use('/post', postRouter);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;

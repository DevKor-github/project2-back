import * as express from 'express';

import postRouter from './post';
import categoryRouter from './category';
import userRouter from './user';

const router = express.Router();

router.use('/post', postRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);
router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;

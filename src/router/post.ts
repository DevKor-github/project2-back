import * as express from 'express';
import * as postController from '../controller/post';

const router = express.Router();

router.get('/', postController.getPostList);
router.get('/Pick', postController.pickPost);
router.get('/delete', postController.deletePost);
router.post('/create', postController.createPost);
router.get('/update', postController.createPost);
export default router;

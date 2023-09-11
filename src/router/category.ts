import * as express from 'express';
import * as postController from '../controller/category';

const router = express.Router();

router.get('/', postController.getCategory);
router.get('/Pick', postController.pickCategory);
router.get('/delete/:id', postController.deleteCategory);
router.post('/create', postController.createCategory);
router.get('/update/:id', postController.updateCategory);
export default router;
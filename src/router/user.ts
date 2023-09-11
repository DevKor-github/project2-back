import * as express from 'express';
import * as userController from '../controller/user'

const router = express.Router();

router.post('/register', userController.register)
router.post('/login', userController.login);

export default router;
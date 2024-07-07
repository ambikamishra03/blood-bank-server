import  express  from 'express';
import { loginController, registerController } from '../controller/authController.js';

const router = express.Router();
//Register || POST
router.post('/register',registerController)
 // Login || POST
router.post('/login',loginController)


export default router;

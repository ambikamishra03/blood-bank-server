import  express  from 'express';
import { loginController, registerController, currentUserController } from '../controller/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
//Register || POST
router.post('/register',registerController)
 // Login || POST
router.post('/login',loginController)

//GET CURRENT USER || GET
router.get('/current-user',authMiddleware,currentUserController);


export default router;

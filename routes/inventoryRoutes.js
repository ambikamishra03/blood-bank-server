import express from 'express'
import { authMiddleware } from './../middlewares/authMiddleware.js';
import { getInventryController, inventoryController } from '../controller/inventoryController.js';


const router = express.Router();


// ADD INVENTORY || POST
router.post('/create-inventory',authMiddleware,inventoryController);

// GET INVENTORY || GET
router.get('/get-inventory',getInventryController);

export default router;
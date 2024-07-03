import express from "express";
import { registerController } from "../controller/authController";
// router object
const router = express.Router();

//routes
router.post('/register',registerController)

// exports
export default router;

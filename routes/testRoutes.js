import express from "express";
import { testController } from "../controller/testController.js";

// router object
const router = express.Router();

//routes
router.get("/",testController);

// exports
export default router;

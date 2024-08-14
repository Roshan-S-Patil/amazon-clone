import express from "express"
import { upload } from "../middlewares/multer.js";
import {addReview} from "../controllers/reviewController.js"
const router=express.Router();
//CREATE
router.post("/add",upload.array('reviewImages',6),addReview);
export default router
import { createOrder , paymentVerification,updateOrderInDatabase} from "../controllers/checkoutController.js"
import {apiKey} from "../middlewares/apiKey.js"
import express from "express"
import { authenticate } from"../middlewares/authentication.js"
const router=express.Router();
router.post("/order",createOrder)
router.post("/payment-verification",authenticate,apiKey,paymentVerification,updateOrderInDatabase)
export default router;
// 
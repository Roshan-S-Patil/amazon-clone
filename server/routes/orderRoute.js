import express from "express"
import { authenticate } from "../middlewares/authentication.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  getRazorpayOrder,
  createOrder,
  getAllOrders,
  getIndividualOrder,
  cancleOrder,
  requestCancellation,
  getCancellationRequests,
  getIndividualCancelationRequest,
  acceptCancellationRequest,
  denyCancellationRequest,
  getRefundStatus,
  changeOrderStatus
} from "../controllers/orderController.js";
const router = express.Router();
router.get("/individual-order",authenticate, getIndividualOrder);
router.get("/get-all-orders",authenticate,isAdmin, getAllOrders);
router.post("/create-order", authenticate, createOrder);
router.patch("/request-cancellation", authenticate, requestCancellation);
router.get("/get-refund-status", getRefundStatus);
router.post("/", getRazorpayOrder);
router.get("/get-cancellation-requests",authenticate,isAdmin, getCancellationRequests);
router.get("/get-individual-cancellation-request",authenticate,isAdmin,getIndividualCancelationRequest);
router.patch("/accept-cancellation-request",authenticate,isAdmin, acceptCancellationRequest);
router.patch("/deny-cancellation-request",authenticate,isAdmin, denyCancellationRequest);
router.post("/cancle-order",authenticate,isAdmin, cancleOrder);
router.patch("/change-status",authenticate,isAdmin,changeOrderStatus)
export default router;
//CREATE
//READ
//UPDATE
// 

import Razorpay from "razorpay";
import Order  from "../models/orders.js";
import User from "../models/users.js";
import CancellationRequest from"../models/cancellationRequests.js";
import CancelledProduct from"../models/cancelledProducts.js";
import Product from "../models/products.js"
//ADD
const createOrder = async (req, res) => {
  const {
    order,
    razorpayOrderId,
    address,
    paymentMode,
    _id,
    status,
    deliveryDate,
  } = req.body;
  let products = [];
  if (order instanceof Array) {
    products = order;
  } else {
    order.quantity = 1;
    order.cancelling = false;
    order.cancelled=false
    products.push(order);
  }
  const newOrder = new Order({
    products,
    address,
    paymentMode,
    razorpayOrderId,
    paymentStatus: status,
    deliveryDate,
  });

// 
  try {
    const savedOrder = await newOrder.save();
    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { $push: { orders: savedOrder._id } },
      { new: true }
    )
    .populate({ path: "referralCode", strictPopulate: false })
    .populate({ path: "referredBy", strictPopulate: false })
    .populate({ path: "addresses", strictPopulate: false })
    .populate({ path: "orders", strictPopulate: false })
    .populate({path:"cancelledProducts",strictPopulate:false})
    .exec();
    if (paymentMode === "cod") {
      res.status(200).redirect("/profile/your-orders");
    } else {
      res.status(200).send(updatedUser);
    }
  } catch (error) {
    res.status(200).send(error)
  }
};
//GET
var instance = new Razorpay({
  key_id: "rzp_test_b1zV3q2zX9W250",
  key_secret: "3spTlzmpTxdMJ0oVZeAWypR3",
});
const getRazorpayOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await instance.orders.fetch(orderId);
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(404).send(error);
  }
};
const getIndividualOrder = async (req, res) => {
  const { orderId } = req.query;
  try {
    const order = await Order.findById({ _id:orderId });
    res.status(200).send(order);
  } catch (error) {
    res.status(404).send("Order not found");
  }
};
const requestCancellation = async (req, res) => {
    const { orderId, productId } = req.query;
    const { _id } = req.body;
    try {
      const order = await Order.findOne({ _id: orderId });
      if (!order) {
        res.status(404).send("Order or Product not found");
      }
      const productIndex = order.products.findIndex(
        (product) => product._id.toString() === productId
      );
      if (productIndex === -1) {
        res.status(404).send("product not found");
      }
      order.products[productIndex] = {
        ...order.products[productIndex],
        cancelling: true,
      };
      const savedOrder = await order.save();
      const cancellationRequest = new CancellationRequest({
        orderId: savedOrder._id,
        createdBy: _id,
        productId
      });
      await cancellationRequest.save();
      const updatedUser = await User.findOne({ _id })
      .populate({ path: "referralCode", strictPopulate: false })
      .populate({ path: "referredBy", strictPopulate: false })
      .populate({ path: "addresses", strictPopulate: false })
      .populate({ path: "orders", strictPopulate: false })
      .populate({path:"cancelledProducts",strictPopulate:false})
      .exec();
      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(400).send(error);
    }
};
const cancleOrder = async (req, res) => {
  const { amount, paymentId } = req.body;
  try {
    const response = await instance.payments.refund(paymentId, {
      amount: amount * 100,
      speed: "optimum",
    });
 
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getCancellationRequests = async (req, res) => {
  try {
    const cancellationRequests = await CancellationRequest.find()
    .populate({ path: "orderId", strictPopulate: false })
        .exec();
    res.status(200).send(cancellationRequests);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getIndividualCancelationRequest=async(req,res)=>{
    const {reqId}=req.query
    try {
        const request=await CancellationRequest.findById({_id:reqId})
        .populate({ path: "orderId", strictPopulate: false })
        .exec();
        res.status(200).send(request)
    } catch (error) {
        res.status(400).send(error)
    }
}
const acceptCancellationRequest=async(req,res)=>{
  const {amount,paymentId,orderId,productId,quantity,reqId,userId}=req.query
  try {
    const response = await instance.payments.refund(paymentId, {
      amount: Math.round(parseInt(amount) * 100),
      speed: "optimum",
    });
    const product=await Product.findById({_id:productId})
    const newCancelledProduct=new CancelledProduct({
      orderId,
      amount,
      product,
      quantity,
      refundId:response.id
    })
    const savedCancelledProduct=await newCancelledProduct.save()
    await User.findByIdAndUpdate({_id:userId},{$push:{cancelledProducts:savedCancelledProduct._id}})

    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      res.status(404).send("Order or Product not found");
    }
    const productIndex = order.products.findIndex(
      (product) => product._id.toString() === productId
    );
    if (productIndex === -1) {
      res.status(404).send("product not found");
    }
    order.products[productIndex] = {
      ...order.products[productIndex],
      cancelled: true,
    };
    await order.save()
   const updatedRequest=await CancellationRequest.findByIdAndUpdate({_id:reqId},{$set:{status:"accepted"}},{new:true})
   .populate({path:"orderId",strictPopulate:false})
   .exec()
    res.status(200).send(updatedRequest);
  } catch (error) {
    res.status(400).send(error);
  }
}
const denyCancellationRequest=async(req,res)=>{
    const { productId,reqId ,orderId} = req.query;
  try {
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      res.status(404).send("Order or Product not found");
    }
    const productIndex = order.products.findIndex(
      (product) => product._id.toString() === productId
    );
    if (productIndex === -1) {
      res.status(404).send("product not found");
    }
    order.products[productIndex] = {
      ...order.products[productIndex],
      cancelling: false,
    };
    await order.save()
   const updatedRequest=await CancellationRequest.findByIdAndUpdate({_id:reqId},{$set:{status:"denied"}},{new:true})
   .populate({path:"orderId",strictPopulate:false})
   .exec()
    res.status(200).send(updatedRequest);
  } catch (error) {
    res.status(400).send(error);
  }
}
const getRefundStatus=async(req,res)=>{
  const {refundId}=req.query
  try {
    const response=await instance.refunds.fetch(refundId)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send(error)
  }
}
const changeOrderStatus=async(req,res)=>{
  const {orderId,status}=req.query
  try {
    const updatedOrder=await Order.findByIdAndUpdate({_id:orderId},{$set:{status:status}},{new:true})
    res.status(200).send(updatedOrder)
  } catch (error) {
    res.status(400).send(error)
  }
}
//EDIT
//DELETE
export {
  createOrder,
  getRazorpayOrder,
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
};

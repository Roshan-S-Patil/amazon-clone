import Razorpay from "razorpay"
import Order from"../models/orders.js"
import crypto from "crypto";
import Product from "../models/products.js"
import dotenv from "dotenv"
dotenv.config()
const instance = new Razorpay({ key_id: process.env.YOUR_KEY_ID, key_secret: process.env.YOUR_SECRET })
const createOrder=async(req,res)=>{
    const {amount,currency}=req.body;
try {
     const order=await instance.orders.create({
      amount:Number(amount*100),
      currency,
     })
     res.status(200).send(order)
} catch (error) {
  res.status(400).send(error)
}
}
const paymentVerification=async(req,res,next)=>{
   const {razorpay_payment_id,razorpay_signature,_id}=req.body;
   const body=JSON.parse(req.query.order).id+"|"+razorpay_payment_id;
   const generated_signature=crypto.createHmac("sha256",process.env.YOUR_SECRET)
   .update(body.toString())
   .digest("hex");
   let signatureVerified=false;
  if (generated_signature===razorpay_signature) {
    signatureVerified=true;
  }
  req.body.order=JSON.parse(req.query.order);
  req.body.signatureVerified=signatureVerified;
  req.body.razorpay_payment_id=razorpay_payment_id
  next()
}
const updateOrderInDatabase=async(req,res)=>{
  const {order,signatureVerified,razorpay_payment_id}=req.body
  try {
    const razorpayOrder=await instance.orders.fetch(order.id)
    const backendOrder=await Order.findOneAndUpdate({razorpayOrderId:order.id},{$set:{signatureVerified:signatureVerified,paymentStatus:razorpayOrder.status,amount:(razorpayOrder.amount/100),razorpay_payment_id:razorpay_payment_id}})
   for(let i=0;i<backendOrder.products.length;i++){
      const product=await Product.findById({_id:backendOrder.products[i]._id})
      await product.updateOne({$set:{stock:product.stock-(backendOrder.products[i].quantity),razorpay_payment_id}})
   }
    res.status(200).redirect("/profile/your-orders")
  } catch (error) {
  }
}
// 
export {
    createOrder,
    paymentVerification,
    updateOrderInDatabase
}
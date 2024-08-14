import mongoose from "mongoose";
const cancelledProductsSchema=mongoose.Schema({
    orderId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    product:{
        type:Object,
        required:true,
    },
    amount:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true,
    },
    refundId:{
        type:String,
        required:true,
    },
},{timestamps:true})
export default mongoose.model("CancelledProduct",cancelledProductsSchema)
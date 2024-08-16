import mongoose from "mongoose";
const cancellationRequestSchema=mongoose.Schema({
    orderId:{
        type:mongoose.Types.ObjectId,
        ref:"Order",
        required:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["requested","accepted","denied"],
        default:"requested"
    },
    productId:{
        type:String,
        required:true,
    }
},{timestamps:true})
export default mongoose.model("CancellationRequest",cancellationRequestSchema)
// 
import mongoose from "mongoose";
const referralCodeSchema=mongoose.Schema({
    referralCode:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true,
    },
    createdById:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})
export default mongoose.model("ReferralCode",referralCodeSchema);
// 
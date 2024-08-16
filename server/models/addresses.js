import mongoose from "mongoose";
const addressSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    addressLine1:{
        type:String,
        required:true,
    },
    addressLine2:{
        type:String,
    },
    city:{
        type:String,
        required:true,
    },
    pincode:{
        type:Number,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    landmark:{
        type:String,
    },
},{timestamps:true})
export default mongoose.model("Address",addressSchema);
// 
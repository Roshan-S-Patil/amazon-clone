import mongoose from "mongoose";
const reviewSchema=mongoose.Schema({
    reviewBy:{
        type:String,
        required:true
    },
    reviewOfProduct:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    reviewHeading:{
        type:String,
        required:true,
    },
    reviewDescription:{
        type:String,
        required:true,
    },
    reviewById:{
        type:String,
        required:true
    },
    reviewImages:[]
},{timestamps:true})
export default mongoose.model("Review",reviewSchema);

import mongoose from "mongoose";
const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        // unique:true
    },
    subCategories:[{
        type:mongoose.Types.ObjectId,
        ref:"SubCategory"
    }
    ]
},{timestamps:true})
export default  mongoose.model("Category",categorySchema);

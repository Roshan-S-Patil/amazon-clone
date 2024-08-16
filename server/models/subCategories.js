import mongoose from "mongoose";
const subCategorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        // unique:true
    }
    
},{timestamps:true})
export default mongoose.model("SubCategory",subCategorySchema);

// 
import Review from "../models/reviews.js"
import User from "../models/users.js"
import Product from "../models/products.js"
import {uploadOnCloudinary} from "../services/cloudinary.js"
//ADD
const addReview=async(req,res)=>{
    const {reviewDescription,reviewHeading,rating,reviewOfProduct,reviewBy,reviewById}=req.body
    const links=[]
    for(let i=0;i<req.files.length;i++){
        const element=req.files[i];
        const link=await uploadOnCloudinary(element.path)
        links.push(link.url)
       }
const newReview=new Review({
    reviewBy,
    reviewDescription,
    reviewHeading,
    reviewOfProduct,
    rating,
    reviewImages:links, 
    reviewById
})
// 
try {
    const savedReview=await newReview.save();
    await User.findOneAndUpdate({_id:reviewById},{$push:{reviews:savedReview._id}})
    const product=await Product.findById({_id:reviewOfProduct})
    const totalRating=product.totalRating+parseInt(rating)
    await product.updateOne({$set:{totalRating,numberOfReviews:(product.numberOfReviews)+1},$push:{reviews:savedReview._id}})
    res.status(200).redirect(`/individual-product/${reviewOfProduct}`)
} catch (error) {
    res.status(400).send(error);
}
}
//GET
//EDIT
//DELETE
export {addReview}
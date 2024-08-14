import Category from "../models/categories.js"
import SubCategory from "../models/subCategories.js"
const checkCategory=async(req,res,next)=>{
    let {addingCategory,addingSubCategory,category,subCategory}=req.body
    try {
        if(addingCategory==="true"&&addingSubCategory==="true"){
            const newSubCategory=new SubCategory({
                name:subCategory
            })
            const savedSubCategory=await newSubCategory.save()
            const newCategory=new Category({
                name:category,
                subCategories:[savedSubCategory._id],
            })
            await newCategory.save()
            req.body.subCategory=savedSubCategory._id;
            next()
        }
        if((addingCategory==="false" && addingSubCategory==="true")){
            const newSubcategory=new SubCategory({
                name:subCategory,
            })
            const savedSubCategory=await newSubcategory.save()
            await Category.findByIdAndUpdate({_id:category},{$push:{subCategories:newSubcategory._id}})
            req.body.subCategory=savedSubCategory._id
            next()
        }
        if(addingCategory==="false"&&addingSubCategory==="false"){
           try {
             const getCategory=await Category.findOne({_id:category})
             const getSubCategory=await SubCategory.findOne({_id:subCategory})
             req.body.category=getCategory?._id
             req.body.subCategory=getSubCategory?._id
             next()
           } catch (error) {
            res.status(404).send("category not found")
           }
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
export {checkCategory}
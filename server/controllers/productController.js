
import Category from "../models/categories.js";
import Product from "../models/products.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
//ADD
const addProduct = async (req, res) => {
  const {
    name,
    category,
    subCategory,
    mrp,
    sellingPrice,
    deliveryCharges,
    deliveryDays,
    warranty,
    replacementDays,
    specificationName,
    specification,
    stock,
    productDescription,
  } = req.body;

  const links = [];
  try {
    for (let i = 0; i < req.files.length; i++) {
      const element = req.files[i];
      const link = await uploadOnCloudinary(element.path);
      links.push(link.url);
    }
    const product = new Product({
      name,
      category,
      subCategory,
      mrp,
      sellingPrice,
      deliveryCharges,
      warranty,
      replacementDays,
      specificationName,
      specification,
      images: links,
      deliveryDays,
      stock,
      productDescription,
    });
    const savedProduct = await product.save();
    res.status(200).redirect(`/individual-product/${savedProduct._id}`);
  } catch (error) {
  }
};
//GET Searched Products
const getSearchedProduct = async (req, res) => {
  const { search, page, limit } = req.query;
  const pageNo = page || 1;
  const pagesLimit = limit || 8;
  const skip = (pageNo - 1) * pagesLimit;
  try {
    const products = await Product.find({
      name: { $regex: new RegExp(".*" + search + ".*", "i") },
    })
      .limit(pagesLimit)
      .skip(skip)
      .exec();
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send("PRODUCT NOT FOUND");
  }
};

//Get Individual Product
const getIndividual = async (req, res) => {
  const { product } = req.query;
  try {
    const individualProduct = await Product.findById({ _id: product })
      .populate({ path: "reviews", strictPopulate: false })
      .exec();
    if (!product) res.status(404).send("product not found");
    res.status(200).send(individualProduct);
  } catch (error) {}
};
// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find()
      .populate({ path: "category", strictPopulate: false })
      .populate({ path: "subCategory", strictPopulate: false });
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.find()
      .populate({ path: "subCategories", strictPopulate: false })
      .exec();
    res.status(200).send(allCategories);
  } catch (error) {
    res.status(400).send(error);
  }
};
// 
// Get Category wise Products
const getCategoryWiseProducts = async (req, res) => {
  const { category } = req.query;
  try {
    const products = await Product.find({ category });
    res.status(200).send(products);
  } catch (error) {
    res.status(200).send(error);
  }
};
const getIndividualCategory =async(req,res)=>{
  const {category}=req.query
  try {
    const individualCategory=await Category.findById({_id:category})
    .populate({path:"subCategories",strictPopulate:false});
    res.status(200).send(individualCategory)
  } catch (error) {
    res.status(400).send(error)
  }
}
const getSubCategoryWiseProducts=async(req,res)=>{
  const {subcategory}=req.query
  try {
    const products=await Product.find({subCategory:subcategory})
    res.status(200).send(products)
  } catch (error) {
    res.status(400).send(error)
  }
}

const exploreCategory=async(req,res)=>{
  const {category}=req.query;
  try {
    const products=await Product.find({category},{name:1,mrp:1,sellingPrice:1,stock:1,images:1,_id:1})
                                .limit(4)
    res.status(200).send(products)              
  } catch (error) {
    res.status(400).send(error)
  }
}
//EDIT
// UPDATE STOCK
const updateStock = async (req, res) => {
  const { product_id, stock } = req.query;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: product_id },
      { $set: { stock: parseInt(stock) } },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};
//DELETE
export {
  addProduct,
  getSearchedProduct,
  getIndividual,
  getAllProducts,
  getCategories,
  updateStock,
  getCategoryWiseProducts,
  getIndividualCategory,
  getSubCategoryWiseProducts,
  exploreCategory
};

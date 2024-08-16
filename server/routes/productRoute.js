import express from "express"
import {upload} from "../middlewares/multer.js"
import {
  addProduct,
  getSearchedProduct,
  getIndividual,
  getAllProducts,
  getCategories,
  updateStock,
  getCategoryWiseProducts,
  getIndividualCategory,
  getSubCategoryWiseProducts,
  exploreCategory,
} from "../controllers/productController.js";
import { checkCategory } from "../middlewares/checkCategory.js";
const router = express.Router();
//CREATE
router.post(
  "/add",
  upload.array("productImages", 6),
  checkCategory,
  addProduct
);
//READ
// CategoryWise Products
router.get("/products-of-category", getCategoryWiseProducts);
router.get("/products-of-subcategory", getSubCategoryWiseProducts);
router.get("/individual-category", getIndividualCategory);
router.get("/explore-categories",exploreCategory)
// SubCategoryWise Products
//Searched Product
router.get("/search", getSearchedProduct);
//Individual Product
router.get("/search-individual", getIndividual);
//All Products
router.get("/", getAllProducts);
//All Categories
router.get("/categories", getCategories);
//UPDATE
router.patch("/update-stock", updateStock);
//DELETE
export default router
// 

import express from "express"
import {signUp,logIn,logOut,getUser,addAddress,updateCart,getAllUsers, changeRole, searchUser,updateUserDetail} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authentication.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router=express.Router();
//GET
router.get("/all-users",authenticate,isAdmin,getAllUsers)
router.get("/",authenticate,getUser)
//SIGNUP
router.post("/signup",signUp)
//LOGIN
router.post("/login",logIn)
//LOGOUT
router.post("/logout",logOut)
//UPDATE
router.patch("/add-address",authenticate,addAddress)
router.patch("/update-cart",authenticate,updateCart)
router.patch("/update-user-detail",authenticate,updateUserDetail)
// CHANGE ROLE
router.patch("/change-role",authenticate,isAdmin,changeRole)
router.get("/search-user",authenticate,isAdmin,searchUser)
export default router


// 
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const setUser=({userExists})=>{
    console.log("id in setUser",userExists?._id)
    return jwt.sign({_id:userExists?._id,role:userExists?.role},process.env.JWT_SECRET);
}
export  {setUser}
// 
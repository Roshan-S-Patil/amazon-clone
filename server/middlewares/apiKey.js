import dotenv from "dotenv"
dotenv.config()
const apiKey=async(req,res,next)=>{
   req.body.key=process.env.YOUR_KEY_ID
    next()
}
export {apiKey}
// 
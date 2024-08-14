import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const authenticate=async(req,res,next)=>{
    const uid=req.cookies.uid
    if(!uid){
        res.status(404).send("user not found")
    }else{
        try {
            const verified=jwt.verify(uid,process.env.JWT_SECRET)
            req.body._id=verified._id
            req.body.role=verified.role
        } catch (error) {
            res.status(404).send("user not found")
        }
        next()
    }

 
}
export {authenticate}

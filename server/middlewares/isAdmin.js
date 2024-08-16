const isAdmin=(req,res,next)=>{
    const {role}=req.body;
    role==="admin"?next():res.status(400).send("unautorized request")
}
export {isAdmin}
// 
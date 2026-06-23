const jwt=require("jsonwebtoken")
const protect=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        console.log("AUTH HEADER:", authHeader);
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message:"Not Authorized"
            })
        }
        const token=authHeader.split(" ")[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);
        req.userId=decoded.id
        next();

    }catch(error){
        res.status(401).json({
            message:"token failed"
        })
    }
}   
module.exports=protect
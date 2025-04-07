const jwt=require("jsonwebtoken")

const userAuth = async(req,res,next)=>{
    try{
        const token=req.cookies.token
        if(!token){
            throw new Error("Token not found")
        }
        const decoded =jwt.verify(token,"Kiran@123#")
        if(!decoded){
            throw new Error("Invalid token")
        }
        const {_id} = decoded
        const user = await User.findById(_id)
        if(!user){
            throw new Error("User not found")
        }
        req.user=_user
        next()
    }
    catch(err){
        return res.status(401).json("Authentication error")
    }
 
}

module.exports={
    userAuth
}
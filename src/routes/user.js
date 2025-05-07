express=require('express')

userRouter=express.Router()
userAuth=require('../middleware/auth')
Connection=require('../models/connection')

userRouter.get('/user/requests/recieved',userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user
        const requests=await Connection.find({
            toId:loggedInUser._id,
            status:"interested"
        })
        res.send(requests)
    }
    catch(err){
        console.log(err)
        return res.status(400).json({error: err.message})
    }
})


module.exports=userRouter
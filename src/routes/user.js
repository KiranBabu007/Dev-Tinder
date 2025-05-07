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
        }).populate('fromId',["firstName","lastName","age","gender"])
        res.json({
            message :"Recieved requests",
            data : requests
        }
        )
    }
    catch(err){
        console.log(err)
        return res.status(400).json({error: err.message})
    }
})

userRouter.get('/user/connections',userAuth,async(req,res)=>{
    try{
        const user=req.user
        const connections=await Connection.find({
            $or:[
                {fromId:user._id},
                {toId:user.id}
            ],
            status:"accepted"
        }).populate('fromId',["firstName","lastName","age"]).populate('toId',["firstName","lastName","age"])

        const data =connections.map((connection)=>{
            if(connection.fromId===user._id){
                return connection.toId
            }
            else{
                return connection.fromId
            }
        })

        res.json({
            message :"Connections",
            data : data
        }
        )

    }catch(err){
        console.log(err)
        return res.status(400).json({error: err.message})
    }
})


module.exports=userRouter
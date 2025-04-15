const express=require('express')

const requestRouter=express.Router()

const { userAuth }=require('../middleware/auth')

const Connection = require('../models/connection')
const User = require('../models/user')

requestRouter.post('/request/send/:status/:toId',userAuth,async(req,res)=>{
    try{
        const {toId,status} = req.params
        const allowed=["interested","ignored"]

        if(!allowed.includes(status)){
            throw new Error("Invalid status")
        }

        const fromId = req.user._id
        if(fromId===toId){
            throw new Error("You cannot send request to yourself")
        }

        const isValidId = await User.findById(toId)
        if(!isValidId){
            throw new Error("Invalid user id")
        }

        const existingConnection = await Connection.findOne({
            "$or":[{fromId,toId},
                {fromId:toId,toId:fromId}]
            })
        if(existingConnection){
            throw new Error("Request already sent")
        }

        await Connection.create({fromId,toId,status})
        res.send("Kittitond")
    }catch(err){
        console.log(err)
        return res.status(400).json({error: err.message})
    }

    })

    module.exports=requestRouter
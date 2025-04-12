const express=require('express')

const requestRouter=express.Router()

const { userAuth }=require('../middleware/auth')

const Connection = require('../models/connection')

requestRouter.post('/request/send/:status/:toId',userAuth,async(req,res)=>{
    try{
        const {toId,status} = req.params
        const fromId = req.user._id
        const connection = await Connection.create({fromId,toId,status})
        connection.save()
        res.send("Kittitond")
    }catch(err){
        console.log(err)
        return res.status(400).json({error: err.message})
    }

    })

    module.exports=requestRouter
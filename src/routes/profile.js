const express=require('express')
const profileRouter=express.Router()
const { userAuth } = require('../middleware/auth')
const { validateEditProfile } = require('../utils/validateEditProfile')


profileRouter.get('/profile/view', userAuth, async (req, res) => {
    const user=req.user
    res.send(user)
})

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {

    try{
        const user=req.user
        if(!validateEditProfile(req.body)){
        throw new Error("Invalid data")
        }
        Object.keys(req.body).forEach((key)=>{
            user[key]=req.body[key]
        })
        user.save()

        res.send("Updation Successfull")
    }catch(err){
        console.log(err)
        return res.status(400).json({error: err.message})
    }
    
})

module.exports=profileRouter
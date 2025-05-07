const express=require('express')
const authRouter=express.Router()
const User = require('../models/user')  
const { validateSignUp } = require('../utils/SignUpValidation')
const bcrypt = require('bcrypt')


authRouter.post('/login',async(req, res) => {

    try{
        const {password,email} =req.body

        const user=await User.findOne({email})
        if(!user){
            throw new Error("Invalid email")
        }
        const isValid=await user.ValidatePassword(password)
        if(isValid){
            const token=user.jwtToken()
            res.cookie('token',token)
            res.send("Login Successfull")
        }
        else{
            throw new Error("Invalid credentials")
        }
    }
    catch(err){
        console.log(err)
        return res.status(400).json({error: err.message})
    }
})

authRouter.post('/signup', async(req, res) => {
    

    try {
        const { firstName,lastName,email,password,gender,age } = req.body

        const passwordHash = await bcrypt.hash(password, 10)
        const user =new User({
            firstName,
            lastName,
            email,
            gender,
            age,
            password:passwordHash
        })
        validateSignUp(user)
        const savedUser = await user.save()
        console.log("Saved user:", savedUser) // Debug saved user
        res.status(201).json(savedUser)
    } catch(err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
})

authRouter.get('/logout',(req,res)=>{
    res.clearCookie('token')
    res.send("Logout Successfull")
})

module.exports=authRouter




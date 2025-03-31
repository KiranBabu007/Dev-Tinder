const express = require('express');
const connectDB = require('./config/database')
const User = require('./models/user')
const { validateSignUp } = require('./utils/SignUpValidation')
const bcrypt = require('bcrypt')
connectDB()

const app = express();

app.use(express.json())

app.post('/login', async(req, res) => {

    try{
        const {password,email} =req.body

        const user=await User.findOne({email})
        if(!user){
            throw new Error("Invalid credentials")
        }
        const isValid=bcrypt.compareSync(password, user.password)
        if(isValid){
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

app.post('/signup', async(req, res) => {
    

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

app.get('/users', async(req, res) => {
    const userEmail = req.body.email
    try {
        const users = await User.find({email: userEmail})
        res.json(users)
    } catch(err) {
        console.log(err)
        res.status(404).json({ error: "User not found" })
    }
})

app.listen(3000, () => {
    console.log('Server started at port 3000');
});
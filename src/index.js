const express = require('express');
const connectDB = require('./config/database')
const User = require('./models/user')
connectDB()

const app = express();

app.use(express.json())

app.post('/signup', async(req, res) => {
    console.log('Received data:', req.body) // Debug received data
    const user = new User(req.body)
    console.log('Created user object:', user) // Debug user object

    try {
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
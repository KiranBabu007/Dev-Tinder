const express = require('express');
const connectDB = require('./config/database')
const User = require('./models/user')
const { validateSignUp } = require('./utils/SignUpValidation')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt=require('jsonwebtoken')

connectDB()

const { userAuth } = require('./middleware/auth')
const app = express();

app.use(express.json())
app.use(cookieParser())

app.get('/profile', userAuth, async (req, res) => {
    const user=req.user
    res.send(user)
})



app.listen(3000, () => {
    console.log('Server started at port 3000');
});
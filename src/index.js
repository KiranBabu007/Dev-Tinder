const express = require('express');
const connectDB = require('./config/database')
const cookieParser = require('cookie-parser')


connectDB()

const app = express();

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')

app.use(express.json())
app.use(cookieParser())
app.use('/',authRouter)
app.use('/',profileRouter)





app.listen(3000, () => {
    console.log('Server started at port 3000');
});
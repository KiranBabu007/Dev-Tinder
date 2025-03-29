const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    console.log('Attempting database connection...')
    try {
           
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected successfully')
    } catch (error) {
        console.error('Database connection error:', error.message)
        throw error
    }
}

module.exports = connectDB
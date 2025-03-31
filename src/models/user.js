const mongoose = require("mongoose");
var validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true, 
      unique: true, // Ensure uniqueness at the database level
      lowercase: true,
      trim: true,
      validate(value){
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format");
        }
      }
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min:18
    },
    gender: {
      type: String,
      required: true,
    },
    skills: {
        type:[String]
    },

  },
  {
    timestamps: true,
  }
);



const User = mongoose.model("User", userSchema);

module.exports = User;

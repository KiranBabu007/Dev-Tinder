const mongoose = require("mongoose");
var validator = require('validator');
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
      unique: true, 
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

userSchema.methods.jwtToken = function() {
 
  const token = jwt.sign({_id:this._id},"Kiran@123#")

  return token

}

userSchema.methods.ValidatePassword = async function(password) {
  const user=this
  const isValid=await bcrypt.compare(password, user.password)
  return isValid
}


const User = mongoose.model("User", userSchema);

module.exports = User;

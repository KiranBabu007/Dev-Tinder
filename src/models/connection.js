const mongoose = require("mongoose");

const { Schema } = mongoose;

const connectionSchema = new Schema({
    fromId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    toId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:["interested","ignored","accepted","rejected"]
    }
    
})

connectionSchema.index({fromId:1,toId:1})

const Connection = mongoose.model("Connection",connectionSchema);

module.exports = Connection;

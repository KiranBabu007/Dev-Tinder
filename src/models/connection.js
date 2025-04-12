const mongoose = require("mongoose");

const { Schema } = mongoose;

const connectionSchema = new Schema({
    fromId:{
        type:Schema.Types.ObjectId,
        required:true
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

const Connection = mongoose.model("Connection",connectionSchema);

module.exports = Connection;

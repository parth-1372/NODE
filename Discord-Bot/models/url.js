const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        // required:true,
    },
    visitHistory:[{
        timeStamp:{
            type:Number,
        }
    }],
    cretedFrom:{
        type:String,
        default:"Discord"
    }
},{timestamps:true});

const URL = mongoose.model("url",urlSchema);

module.exports = URL;
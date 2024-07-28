const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name:{
    type:String,
    requried:true,
   },
   email:{
    type:String,
    requried:true,
    unique:true,
   },
   password:{
    type:String,
    requried:true,
   },
   role:{
      type:String,
    requried:true,
    default:"Normal",
   }
},{timestamps:true});

const User = mongoose.model('user',userSchema);

module.exports = User;
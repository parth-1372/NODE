const express = require("express");
const ejs = require("ejs");
const path = require("path");
const userRoute = require('./routes/user');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthCookie } = require("./middleware/auth");

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/BlogSphere').then((e)=>{
    console.log("MongoDb Connected");
})

app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

//MiddleWares
// Error handling middleware should be added after all routes

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthCookie('token'));
app.get('/',(req,res)=>{
    res.render('home',{
        user:req.user
    });
})

app.use('/user',userRoute);

app.listen(PORT,()=>{
    console.log("Server Connected");
})
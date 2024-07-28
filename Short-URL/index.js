const express = require("express");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const { restrictedToLoggedinUserOnly, checkAuth, checkForAuthentication, restrictTo } = require("./middlewares/auth")
const path =require("path");
const staticRoute = require('./routes/staticRouter');


const { connectToMongoDB } = require("./connect");

const URL = require("./models/url");
const { timeStamp } = require("console");
const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>console.log("MongoDB Connected"));

app.set('view engine',"ejs");
app.set('views',path.resolve("./views"))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);


app.use("/url",restrictTo(["Normal","Admin"]) ,urlRoute);
app.use("/",staticRoute);
app.use("/user",userRoute);

app.get('/url/:shortId',async (req,res)=>{
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  },
  {
    $push: {
        visitHistory:{
            timeStamp:Date.now()
        }
    }
  });
  res.redirect(entry.redirectURL);
})

 app.use("/test",async (req,res)=>{
  const allUrl = await URL.find({});
  return res.render('home',{
    urls:allUrl,
    Name:"Parth",
  })
});

app.listen(PORT,()=>{
console.log("Server Started At  :",PORT);
});
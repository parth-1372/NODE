const express = require("express");
const path = require("path");
const multer = require("multer");

const app  = new express();
const PORT = 8000;

// const upload = multer({dest:"uploads/"})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${file.originalname}`
      return cb(null, uniqueSuffix);
    }
  });

const upload = multer({storage});

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//MiddleWare
app.use(express.urlencoded({extended:false}));

//route
app.get('/',(req,res)=>{
    return res.render("homepage");
})

app.post("/upload",upload.fields([
    {name:"profileImage"},
    {name:"coverImage"}
]),(req,res)=>{
   console.log(req.body);
   console.log(req.file);
   return res.redirect("/");
})

app.listen(PORT,()=>{
    console.log("Server Started At " + PORT);
})
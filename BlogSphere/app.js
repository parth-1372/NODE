require('dotenv').config();

const express = require("express");
const ejs = require("ejs");
const path = require("path");
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthCookie } = require("./middleware/auth");
const Blog = require('./models/blog');


const app = express();
const PORT = process.env.PORT || 8000;

mongoose.set('strictQuery',false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};



app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

//MiddleWares


app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthCookie('token'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',userRoute);

app.use('/blog',blogRoute);

app.get('/', async (req, res) => {
    try {

      const allBlogs = await Blog.find({});
      //  console.log("Blogs" ,allBlogs);
       
      res.render('home', {
        user: req.user,
        blogs: allBlogs,
      });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
  });
  connectDB().then(() => {
     console.log("MONGODB Connected");
  });

 
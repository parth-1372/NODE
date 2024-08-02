const {Router} = require("express");
const User = require('../models/user')
const {
  createHmac,randomBytes
} = require('node:crypto');

const router = Router();


router.get('/signin',(req,res)=>{
    res.render("signin");
});
router.get('/signup',(req,res)=>{
    res.render("signup");
});

router.post('/signin',async (req,res)=>{
  const {email,password} = req.body;
  try {
  const token = await User.matchPasswordAndGenerateToken(email,password);
  return res.cookie('token',token).render('home',{
    user:req.user
  });
  } catch (error) {
    return res.render('signin',({
      error:"Incorrect email or Password"
    }));
  }
})

router.post('/signup',async (req,res)=>{
  console.log(req.body);
  const {fullName , email , password} = req.body;
  await User.create({
    fullName:fullName,
    email:email,
    password:password,
  });
  return res.render('home');
});

router.get('/logout',(req,res)=>{
  res.clearCookie('token').redirect('/');
})
module.exports = router;
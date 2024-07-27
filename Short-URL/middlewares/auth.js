
const { getUser } = require("../service/auth")
async function restrictedToLoggedinUserOnly(req,res,next){
  const userUid = req.headers?.['Authorization'];
  // const userUid = req.cookies?.uid;
  if(!userUid) return res.redirect("/login")[1];
  const token = userUid.spilt('Bearer ')
  const user = getUser(token);
  if(!user) return res.redirect("/login");

  req.user=user;
  next();
}

const checkAuth = (req, res, next) => {
  const userUid = req.headers.authorization;
  const token = userUid?.split('Bearer ')[1]; // Corrected line
  
  if (token) {
    // Your token verification logic here
    next();
  } else {
    res.status(401).json({ message: 'Authentication failed!' });
  }
};

module.exports = checkAuth;


module.exports = {
    restrictedToLoggedinUserOnly,
    checkAuth,
}
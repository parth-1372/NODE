
const { getUser } = require("../service/auth");

function checkForAuthentication(req,res,next){
  console.log(req.headers);
  const tokenCookie = req.cookies?.token;
  if(!tokenCookie ){
    return next();
  }
  const token = tokenCookie;
  const user =    getUser(token);

  req.user = user;
  return next();
}
// async function restrictedToLoggedinUserOnly(req,res,next){
//   const userUid = req.headers?.['Authorization'];
//   // const userUid = req.cookies?.uid;
//   if(!userUid) return res.redirect("/login")[1];
//   const token = userUid.spilt('Bearer ')
//   const user = getUser(token);
//   if(!user) return res.redirect("/login");

//   req.user=user;
//   next();
// }

// const checkAuth = (req, res, next) => {
//   const userUid = req.headers.authorization;
//   const token = userUid?.split('Bearer ')[1]; // Corrected line
  
//   if (token) {
//     // Your token verification logic here
//     next();
//   } else {
//     res.status(401).json({ message: 'Authentication failed!' });
//   }
// };

function restrictTo(roles){
  return function(req,res,next){
    if(!req.user ) return res.redirect("/login");

    if(!roles.includes(req.user.role)) return res.end("Unauthorized");

    return next();
  }
}

module.exports = {
    // restrictedToLoggedinUserOnly,
    // checkAuth,
    checkForAuthentication,
    restrictTo,
}
// const sessionIdToUserMap = new Map();
const jwt  = require("jsonwebtoken");
const secret="Parthm"
function setUser(user){
    return jwt.sign({
        ...user
    },secret);
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secret);
}

module.exports = {
    setUser,
    getUser,
}
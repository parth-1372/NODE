const mongoose = require("mongoose");

const { connect } = require("http2");

async function connectToMongoDB(url){
   return mongoose.connect(url);
}

module.exports = {
    connectToMongoDB,
}
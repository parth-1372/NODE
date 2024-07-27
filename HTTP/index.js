// const http = require("http");
// const fs = require("fs");
// const url = require("url");
const express = require("express");

const app = express();

app.get('/' , (req,res) => {
  // res.end("Currerntly At Home Page" + "\nhey I am  " + req.query.name + "\nYou Are  "+req.query.age+"  old");
  res.end("Currerntly At Home Page" );
})
app.get('/about' , (req,res) => {
  res.end("Currerntly At About Page");
})

// function myhandler(req , res){
//   //   console.log(req)
//   //   console.log(res)
//   const log = `${req.method} ${req.url}\n New Request Received:\n`
//   if(req.url === "/favicon.ico"){
//      return  res.end()
//   }
//   const myUrl = url.parse(req.url,true);
//   // console.log(myUrl);
//   fs.appendFile("log.txt",log,(err,data)=>{})
//     switch (myUrl.pathname) {
//       case '/':
//          if(req.method==='GET')  res.end("You Are At HOme Page")
//           break;
//       case '/about':
//            const username = myUrl.query.myname;
//            const rollno = myUrl.query.rollno;
//               res.end(`user name is ${username} and roll number is ${rollno} `)
//               break;
//       case '/contanct':
//                   res.end("You Are Exploring contanct Page")
//                   break;
//        case '/signup':
//         if(req.method==='GET')  res.end("this is Signup Page")
//           else{
//         //call database
//         res.end("Success Post Method")}
//         break;     
//       default:
//           res.end("404 Not Found")
//           break;
//     }
//   };

// const myServer = http.createServer(app);

// myServer.listen(8000,()=>{
//     console.log("Server Started")
// })

app.listen(8000,()=> console.log("Server Start"));
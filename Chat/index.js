const express = require('express');
const path = require('path');

const app = express();
const http = require('http');
const server = http.createServer(app);


const { Server } = require("socket.io");
const io = new Server(server);



app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
res.sendFile(path.resolve('./public/index.html'));
});

io.on('connection',(socket)=>{
    // console.log('a user connected');
    // socket.on('chat message', (msg) => {
    //     console.log('message From User :',msg);
    //   });
    // socket.broadcast.emit('hi');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
const express = require('express');
const http = require('http'); 
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=>{
    console.log('A user connected', socket.id);

    socket.on('msg_send', (data)=>{
        //this is for all the web sockets connections that 
        //exist with y websocket server
        io.emit('msg_rcvd', data);

        //this is only for the same client who has send that 'msg_send 
        //event
        socket.emit("msg_rcvd", data);

        //All the clients will received expect the one who send the event
        socket.broadcast.emit('msg_rcvd', data);
    });
});

//middleware to connect static files in express
// this maps where are your static assets
app.use('/', express.static(__dirname+'/public'));

server.listen(3001, ()=>{
    console.log("Server started");
});
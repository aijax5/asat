const io_c = require("socket.io-client");
var app = require('express')();
var http = require('http').createServer(app);
var io_s = require('socket.io')(http);
ioClient = io_c.connect("http://localhost:3000");


http.listen(8090, () => {
  console.log('listening on *:8090');
});

//catching events from server
ioClient.on("hello-client", (data)=>{
    // console.log("server said "+data);
    ioClient.emit("register","http://localhost:8090 file.mp4");
});

// ioClient.emit("hello-server","aisi sexy lagraha tha!");
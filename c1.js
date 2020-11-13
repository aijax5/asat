const io = require("socket.io-client");

ioClient = io.connect("http://localhost:3000");

//catching events from server
ioClient.on("hello-client", (data)=>{
    console.log("server said "+data);
    ioClient.emit("hello-server","aisi sexy lagraha tha!");
});

// ioClient.emit("hello-server","aisi sexy lagraha tha!");
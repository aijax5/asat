<<<<<<< HEAD
const io = require("socket.io-client");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


ioClient = io.connect("http://localhost:3000");

//catching events from server
ioClient.on("hello-client", (data)=>{
    console.log("server said "+data);

});

// while(true){
    console.log("\n\ninput any key to start search");

    // rl.question("enter search string", (search_str) => {
    //     ioClient.emit('search', search_str);      
    //     rl.close();
    //   });

    ioClient.emit('search', "sashi_latest_albums.mp3");
    ioClient.on('search_res', (response)=>{
        console.log("query response from the server was"+response);
    });
    // console
// }
   
=======
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
>>>>>>> b907c6e5dcf8cde48cf7912bc1d744f38add9cc2

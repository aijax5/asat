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

    ioClient.emit('search', "dds.mp3");
    ioClient.on('search_res', (response)=>{
        console.log("query response from the server was"+response);
    });
    // console
// }
   

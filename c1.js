<<<<<<< HEAD
const io = require("socket.io-client");
const rl = require('console-read-write');

async function main(){

    // const rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout
    // });


    ioClient = io.connect("http://localhost:3000");

    //catching events from server
    ioClient.on("hello-client", (data)=>{
        console.log("server said "+data);

    });

    while(true){
        console.log("\n\n\n");
        // _ = await io.ask('enter search string')
        search_str = await io.ask('enter search string')
        // awaitrl.question("enter search string", (search_str) => {
        //     ioClient.emit('search', search_str);      
        //     rl.close();
        //   });

        ioClient.emit('search', search_str);
        ioClient.on('search_res', (response)=>{
            console.log("query response from the server was"+response);
        });
        // console
    }
};


main();
=======
const io_c = require("socket.io-client");
var app = require('express')();
var http = require('http').createServer(app);
var io_s = require('socket.io')(http);
ioClient = io_c.connect("http://localhost:3000");


function performSearch() {
	console.log("fired")
	ioClient.emit("search","file.mp4")
	
}

http.listen(8080, () => {
  console.log('listening on *:8080');
});

//catching events from server
ioClient.on("hello-client", (data)=>{
    // console.log("server said "+data);
    ioClient.emit("register","http://localhost:8080 file.mp4");
	ioClient.on("register_res", (data)=>{
	console.log("register result "+data);
	myVar = setTimeout(performSearch, 6000);
	// setInterval(() => {
 //  		++counter;
 //  		ioClient.emit("search","file.mp4"); // the object will be serialized for you
	// }, 6000);
		// ioClient.emit("search","file.mp4")
		// performSearch()
	});
	ioClient.on("search_res", (data)=>{
    	console.log("search result "+data);
	});
});

// clearTimeout(myVar);
// ioClient.emit("hello-server","aisi sexy lagraha tha!");
>>>>>>> b907c6e5dcf8cde48cf7912bc1d744f38add9cc2

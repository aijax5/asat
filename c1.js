const io_c = require("socket.io-client");
var app = require('express')();
var http = require('http').createServer(app);
var io_s = require('socket.io')(http);
ioClient = io_c.connect("http://localhost:3000");


function performSearch() {
	console.log(" Search fired")
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
	});
	
	ioClient.on("search_res", (data)=>{
	var fhost = "http://localhost:8090"; // data[1]
	ioClient1 = io_c.connect(fhost);
	ioClient1.on("connected", (data)=>{
   		// console.log("server said "+data);
   		ioClient1.emit("download","file.mp4");
	});
	ioClient1.on('connect_failed', function(){
	    console.log('Connection Failed');
	});
	ioClient1.on('disconnect', function () {
	  console.log('Disconnected');
	});
	    	// console.log("search result "+ data[0]);
});
});


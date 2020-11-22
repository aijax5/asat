var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const io_c = require("socket.io-client");
var dl  = require('delivery');
var fs  = require('fs');

var C_PORT = 8001;

http.listen(C_PORT, () => {
	console.log('listening on *:' + C_PORT);
});


io.on('connection', function (socket) {
	var delivery = dl.listen(socket);
	console.log('in del part')
	delivery.on('delivery.connect', function (delivery) {
		console.log('del.connect');
		delivery.send({
			name: 'send.mp4',
			path: './file.mp4'
		});

		delivery.on('send.success', function (file) {
			console.log('File successfully sent to client!');
		});
	});
});


function performSearch() {
	console.log(" Search fired")
	ioClient.emit("search", "t1.mp4")

}

function downlaod(port) {
    console.log("http://localhost:" + port)
    var socket = io_c.connect("http://localhost:" + port);

    socket.on('connect', function () {
        console.log('in recv c2');
        var delivery = dl.listen(socket);
        delivery.connect();

        delivery.on('receive.start', function (fileUID) {
            console.log('receiving a file!');
        });

        delivery.on('receive.success', function (file) {
            var params = file.params;
            fs.writeFile(file.name,file.buffer, function(err){
                if(err){
                    console.log('File could not be saved.');
                }
                else{
                    console.log('File saved.');
                };
            });
        });
    });
}

//catching events from server
ioClient = io_c.connect("http://localhost:3000"); // search server

ioClient.on("hello-client", (data) => {
	ioClient.emit("register", {
		addr: C_PORT,
		files: ['file.mp4']
	});

	ioClient.on("register_res", (data) => {
		console.log("register result " + data);
		myVar = setTimeout(performSearch, 5000);
	});

	ioClient.on("search_res", (request) => {
		console.log("on search res in c2 " + request);
        downlaod(request.addr, request.fileName);
		// var fhost = "http://localhost:8090"; // data[1]
		// ioClient1 = io_c.connect(fhost);

		// ioClient1.on("connected", (data) => {
			// console.log("server said "+data);
		// 	ioClient1.emit("download", "file.mp4");
		// });
		// ioClient1.on('connect_failed', function () {
		// 	console.log('Connection Failed');
		// });

		// ioClient1.on('disconnect', function () {
		// 	console.log('Disconnected');
		// }); 
		// console.log("search result " + data[0]);
	});
});
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const io_c = require("socket.io-client");
var dl  = require('delivery');
var fs  = require('fs');
var access_key = 'DDS_is_the_best';
var C_PORT = 8001;

http.listen(C_PORT, () => {
	console.log('listening on *:' + C_PORT);
});


io.on('connection', function (socket) {
	var delivery = dl.listen(socket);
	console.log('in del part')
	delivery.on('delivery.connect', function (delivery) {
        console.log('in con part')

        socket.on('fileRequest',(req) =>{
        	console.log('in req part');
            console.log(req)
            if(req.key === access_key){
                delivery.send({
                    name: 'send.mp4',
                    path: './'+req.fileName
                });
            }
            else{
                socket.emit('access_error');
            }
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

function downlaod(query) {
    console.log("http://localhost:" + query.port)
    var socket = io_c.connect("http://localhost:" + query.port);

    socket.on('connect', function () {
        console.log('in recv c2');
        var delivery = dl.listen(socket);
        delivery.connect();
		socket.emit('fileRequest', query);
		console.log('req sent');
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
		myVar = setTimeout(performSearch, 17000);
	});

    ioClient.on("search_res", (data) => {
        console.log("on search res in c2 ");
        console.log(data)
        downlaod(data);
    });
});
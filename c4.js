var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const io_c = require("socket.io-client");
var dl  = require('delivery');
var fs  = require('fs');

var C_PORT = 8002;
var access_key = 'DDS_is_the_best';

app.get('/taxes', (req, res) => {
    res.sendFile(__dirname + '/taxes.html');
});

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
                    name: 'send2.mp4',
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


//client part
ioClient = io_c.connect("http://localhost:3000"); // search server

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

function performSearch() {
    console.log(" Search fired")
    ioClient.emit("search", "file.mp4")
}


ioClient.on("hello-client", (data) => {
    ioClient.emit("register", {addr:C_PORT, files:['t1.mp4']});

    ioClient.on("register_res", (data) => {
        console.log("register result " + data);
        // myVar = setTimeout(performSearch, 8000);
    });

    ioClient.on("search_res", (data) => {
        console.log("on search res in c2 ");
        console.log(data)
        downlaod(data);
    });
});

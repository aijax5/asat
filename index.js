const io_c = require("socket.io-client");
var app = require('express')();
var http = require('http').createServer(app);
var io_s = require('socket.io')(http);
// ioClient = io_c.connect("http://localhost:3000");

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// socket.io sever - events caught
var fmap = {}
io_s.on('connection', (client)=>{
    // console.log('a user connected.');
    client.emit('hello-client', "start")
    client.on('register', (data)=>{
    	var res = data.split(" ")
    	var fname = res[1]
    	var mlist = fmap[fname]
    	if(mlist === undefined)
    		mlist = []
    	mlist.push(res[0])
    	fmap[fname] = mlist
    	client.emit('register_res', "success")
        console.log(mlist);

<<<<<<< HEAD
io.on('connection', (client)=>{
    console.log('a user connected.');
    client.on('register', (files)=>{
      //hash
    });
    client.on('search', (data)=>{
        console.log("client with ip "+" : "+data);
        client.emit('search_res', 'found the file you were looking for');
=======
>>>>>>> b907c6e5dcf8cde48cf7912bc1d744f38add9cc2
    });
    client.on('search', (data)=>{
	    console.log("search");
	    var fname = data
	    client.emit('search_res', fmap[fname])
	});
});

// TODO if 
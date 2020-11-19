var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

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

io.on('connection', (client)=>{
    console.log('a user connected.');
    client.on('register', (files)=>{
      //hash
    });
    client.on('search', (data)=>{
        console.log("client with ip "+" : "+data);
        client.emit('search_res', 'found the file you were looking for');
    });
});

// TODO if 
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
    client.emit('hello-client', "kya be client, kaise yaad kiya")
    client.on('hello-server', (data)=>{
        console.log("client said: "+data);
    });
});

// TODO HOW TO LISTEN ON ALL CLIENTS FOR SOME EVENT
var app = require('express')();
var http = require('http').createServer(app);
var io_s = require('socket.io')(http);


var access_key = 'DDS_is_the_best';

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
io_s.on('connection', (client) => {
  console.log('a user connected.');
  client.emit('hello-client', "start");

  client.on('register', (data) => {
    data.files.forEach(function (file) {
      fmap[file] = data.addr;
    });
    client.emit('register_res', "success")
    console.log(fmap);

  });
  client.on('search', (data) => {
    console.log("search");
    var fname = data
    client.emit('search_res', {
      port: fmap[fname],
      key: access_key,
      fileName: fname
    });
  });
});
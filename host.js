var fs = require('fs')
var net = require('net')
var pump = require('pump')

var server = net.createServer(function (socket) {
  // var filename = "client.js"
  // var file = fs.createReadStream(filename)

  // console.log('Serving', filename)

  // // pipe the file to the TCP client
  // pump(file, socket)

})

server.listen(3000, function () {
  console.log('Server is listening on port 3000')
})
var conn = net.createConnection(8000, 'localhost');
conn.write('register localhost file.mp4')
conn.end()
// var conn = net.createConnection(8000, 'localhost');
// conn.write('search file.mp4')
// conn.end()
// conn.write('localhost')

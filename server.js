var fs = require('fs')
var net = require('net')
var pump = require('pump')

var server = net.createServer(function (socket) {
	// console.log('connected')
	socket.on('data', function(data) {
		var str = String(data);
		res = str.split(" ");
		if(res[0] == "register"){
			console.log(res[1])
			console.log(res[2])
		}
		if(res[0] == "search"){
			console.log(res[1])
		}
		// console.log(res[1])
		// console.log(String(data))
		// if(String(data) == 'register'){

		// }
        
    });
  // var filename = "client.js"
  // var file = fs.createReadStream(filename)

  // console.log('Serving', filename)

  // // pipe the file to the TCP client
  // pump(file, socket)

})

server.listen(8000, function () {
  console.log('Server is listening on port 3000')
})

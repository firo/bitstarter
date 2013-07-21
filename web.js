var fs = require('fs');
var express = require('express');
var fileName = './index.html';


var app = express.createServer(express.logger());
app.use(express.static(__dirname + "/public"));

app.get('/', function(request, response) {
	
	fs.exists(fileName, function(exists) {
		if (exists) {
			fs.stat(fileName, function(error, stats) {
				fs.open(fileName, 'r', function(error, fd) {
					var buffer = new Buffer(stats.size);
					fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
						var data = buffer.toString('utf8', 0, buffer.length);
						response.send(data.toString('utf8'));
						fs.close(fd);
					});
				});
			});
		}
	});
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
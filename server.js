var http = require("http");
var url = require("url");
var fs = require("fs");

const host = 'localhost';
const port = 8080;

var server = http.createServer(function(request, response) {
  var path = url.parse(request.url).pathname;
  switch (path) {
    case '/':
      fs.readFile(__dirname + '/index.html', function(error, data) {
	if (error) {
	  response.writeHead(404);
	  response.write(error);
	  response.end();
	} else {
	  response.writeHead(200, {
	    'Content-Type': 'text/html'
	  });
	  response.write(data);
	  response.end();
	}
      });
      break;

    // Replace string below to load pages not named 'index.html'
    case '/notIndex.html':
      fs.readFile(__dirname + path, function(error, data) {
	if (error) {
	  response.writeHead(404);
	  response.write(error);
	  response.end(error);
	} else {
	  response.writeHead(200, {
	    'Content-Type': 'text/html'
	  });
	  response.write(data);
	  response.end();
	}
      });
      break;
    default:
      response.writeHead(404);
      response.write("This page does not exist - 404");
      response.end();
      break;
  }
});
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

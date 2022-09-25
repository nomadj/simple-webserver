var { createServer } = require("http");
var url = require("url");
var fs = require("fs");

const host = 'localhost';
const port = 8080;

var server = createServer(function(request, response) {
  var path = url.parse(request.url).pathname;
  
  switch (path) {
    case '/':
      fileReader('/index.html');
      break;
    // Edit string below appropriately to load pages not named 'index.html'
    case '/notIndex.html':
      fileReader(path);
      break;
    default:
      response.writeHead(404);
      response.write("This page does not exist - 404");
      response.end();
      break;
  }
  
  function fileReader(path) {
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
  }  
});
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

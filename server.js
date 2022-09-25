const express = require("express");
const url = require("url");
const app = express();
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.listen(8080, function() {
  console.log("Listening on port 8080.");
});

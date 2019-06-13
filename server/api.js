var express = require("express");
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/node_modules'));

app.get("/", function(req, res) {
  // res.setHeader("Content-Type", "text/plain");
  // res.send("home");
  console.log("Navigating to /");
  res.json({ key: 1 });
});

app.get("/test", function(req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get("/temp", function(req, res) {
  // res.setHeader("Content-Type", "text/plain");
  // res.send("home");
  console.log("Navigating to /temp");
  res.json({ key: 2 });
});

app.get("/moist", function(req, res) {
  // res.setHeader("Content-Type", "text/plain");
  // res.send("home");
  console.log("Navigating to /moist");
  res.json({ key: 3 });
});

app.get("/light", function(req, res) {
  // res.setHeader("Content-Type", "text/plain");
  // res.send("home");
  console.log("Navigating to /light");
  res.json({ key: 4 });
});

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain");
  res.status(404).send("Page introuvable !");
});

app.listen(8080);

module.exports = app;

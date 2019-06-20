const express = require("express");
const path = require('path');
const app = express();
const server_conf = require('./conf/server.conf');
const arduino = require('./arduino');

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

app.get("/fan/:value", function(req, res) {
  arduino.fan.setValue(req.params.value > 0 ? 1:0);
  res.sendStatus(200);
});

app.get("/pump/:value", function(req, res) {
  arduino.pump.setValue(req.params.value > 0 ? 1:0);
  res.sendStatus(200);
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

app.listen(server_conf.APP_PORT);
console.log('Server listening on : ' + 'http://localhost:'+server_conf.APP_PORT);
console.log('Test url : ' + 'http://localhost:' + server_conf.APP_PORT + '/test');

module.exports = app;

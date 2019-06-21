const express = require("express");
const path = require('path');
const app = express();
const server_conf = require('./conf/server.conf');
const arduino = require('./arduino');
/*
const mongo = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser());
app.use(bodyParser.json({limits:'Smb'}));
app.use(bodyParser.urlencoded({extended:true}));

const db = mongo.connect('mongodb://bigcgtbul5u9sr9-mongodb.services.clever-cloud.com:27017', (err,response) => {
  err ? console.log(err) : console.log('Connected to ', db, ' + ', response);
});*/
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

app.get("/fan/now", function(req, res) {
  res.status(200).json({ value: arduino.fan.getValue()});
});

app.get("/fan/:value", function(req, res) {
  arduino.fan.setValue(req.params.value > 0 ? 1:0);
  res.sendStatus(200);
});

app.get("/pump/now", function(req, res) {
  res.status(200).json({ value: arduino.fan.getValue()});
});

app.get("/pump/:value", function(req, res) {
  arduino.pump.setValue(req.params.value > 0 ? 1:0);
  res.sendStatus(200);
});

app.get("/temp/now", function(req, res) {
  // res.setHeader("Content-Type", "text/plain");
  // res.send("home");
  console.log("Navigating to /temp");
  res.json({ key: 2 });
});

app.get("/water/now", function(req, res) {
  res.status(200).json({ value: arduino.waterSensor.getValue()});
});

app.get("/moist/now", function(req, res) {
  res.status(200).json({ value: arduino.moistureSensor.getValue()});
});

app.get("/light/now", function(req, res) {
  res.status(200).json({ value: arduino.lightSensor.getValue()});
});

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain");
  res.status(404).send("Page introuvable !");
});

app.listen(server_conf.APP_PORT);
console.log('Server listening on : ' + 'http://localhost:'+server_conf.APP_PORT);
console.log('Test url : ' + 'http://localhost:' + server_conf.APP_PORT + '/test');

module.exports = app;

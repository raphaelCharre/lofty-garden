var arduino_conf = require('./conf/arduino.conf');
var server_conf = require('./conf/server.conf');

var five = require("johnny-five");
var app = require('./api');


var server = require('http').createServer(app);
var io = require('socket.io')(server);
// Requetes
io.sockets.on('connection', function (socket) {
	// Message à la connexion
  console.log('Connexion socket : Ok');
});

server.listen(server_conf.SOCKET_IO_PORT);

//ARDUINO
var board = new five.Board();
var waterSensor;
var fan;

board.on("ready", function() {
    console.log("Board ready")
    initComponents();
});

function initComponents(){
    console.log("Initialize components...");
    initWaterSensor();
    initFan();
    console.log("Initialization complete");
}

function initWaterSensor(){
    waterSensor = new five.Sensor.Digital({
        pin: arduino_conf.WATER_SENSOR_PIN,
        freq: 1000/arduino_conf.DATA_EVENT_FREQUENCY
    })
    waterSensor.on('data', data=>{
        io.sockets.emit(server_conf.SOCKET_IO_EVENT_WATER_SENSOR, data);
    })
    console.log("WATER SENSOR OK");
}

function initFan(){
    fan = new five.Pin(arduino_conf.FAN_PIN);
    console.log("FAN OK");
}

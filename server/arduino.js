const five = require("johnny-five");
const server_conf = require('./conf/server.conf');
const io = require('./sockets');

const arduino = {};
const board = new five.Board();

var waterSensor = require('./arduino_components/waterSensor');
var lightSensor = require('./arduino_components/lightSensor');
var moistureSensor = require('./arduino_components/moistureSensor');
var fan = require('./arduino_components/fan');
var pump = require('./arduino_components/pump');
var tempSensor = require('./arduino_components/tempSensor');

board.on("ready", function() {
    console.log("Board ready")
    initComponents();
    demo();
});

board.on("error", function(message){
    console.error(message);
})

function initComponents(){
    console.log("Initialize components...");
    waterSensor.init();
    waterSensor.onData = function(value){
        //console.log('water : ' + value);
        io.sockets.emit(server_conf.SOCKET_IO_EVENT_WATER_SENSOR, value, new Date().toLocaleTimeString());
    }

    lightSensor.init();
    lightSensor.onData = function(value){
        //console.log('light : ' + value);
        io.sockets.emit(server_conf.SOCKET_IO_EVENT_LIGHT_SENSOR, value, new Date().toLocaleTimeString());
    }

    moistureSensor.init();
    moistureSensor.onData = function(value){
        //console.log('moisture : ' + value);
        io.sockets.emit(server_conf.SOCKET_IO_EVENT_MOISTURE_SENSOR, value, new Date().toLocaleTimeString());
    }

    tempSensor.init();
    tempSensor.onData = function(value){
        //console.log('moisture : ' + value);
        io.sockets.emit(server_conf.SOCKET_IO_EVENT_TEMPERATURE_SENSOR, value, new Date().toLocaleTimeString());
    }

    fan.init();
    fan.onChange = function(value){
        io.sockets.emit(server_conf.SOCKET_IO_EVENT_FAN, value);
    }

    pump.init();
    pump.onChange = function(value){
        io.sockets.emit(server_conf.SOCKET_IO_EVENT_PUMP, value);
    }


    console.log("Initialization complete");
}

function demo(){
}

arduino.board = board;
arduino.waterSensor = waterSensor;
arduino.lightSensor = lightSensor;
arduino.fan = fan;
arduino.pump = pump;
arduino.tempSensor = tempSensor;
module.exports = arduino;

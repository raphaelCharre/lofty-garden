const five = require("johnny-five");
const server_conf = require('./conf/server.conf');
const io = require('./sockets');

const arduino = {};
const board = new five.Board();

var waterSensor = require('./arduino_components/waterSensor');
var lightSensor = require('./arduino_components/lightSensor');
var fan = require('./arduino_components/fan');

board.on("ready", function() {
    console.log("Board ready")
    initComponents();
    demo();
});

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
    fan.init();
    fan.onChange = function(value){
        io.sockets.emit(server_conf.SOCKET_IO_EVENT_FAN, value, new Date(), new Date().toLocaleTimeString());
    }
    console.log("Initialization complete");
}

function demo(){

}

arduino.board = board;
arduino.waterSensor = waterSensor;
arduino.fan = fan;
module.exports = arduino;

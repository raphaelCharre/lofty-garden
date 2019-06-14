const five = require("johnny-five");
const arduino_conf = require('./conf/arduino.conf');
const server_conf = require('./conf/server.conf');
const io = require('./sockets');

const arduino = {};
const board = new five.Board();

var waterSensor = require('./arduino_components/waterSensor');
var fan = require('./arduino_components/fan');

board.on("ready", function() {
    console.log("Board ready")
    initComponents();
    demo();
});

function initComponents(){
    console.log("Initialize components...");
    waterSensor.init();
    fan.init();
    console.log("Initialization complete");
}

function demo(){
    fan.setValue(1);
}

arduino.board = board;
module.exports = arduino;

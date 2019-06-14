const five = require("johnny-five");
const arduino_conf = require('./conf/arduino.conf');
const server_conf = require('./conf/server.conf');
const io = require('./sockets');


const arduino = {};
const board = new five.Board();
const waterSensor;
const fan;

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

arduino.board = board;
module.exports = arduino;
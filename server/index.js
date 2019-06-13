var arduino_conf = require('./conf/arduino.conf');
var socket_io_conf = require('./conf/socket-io.conf');

var five = require("johnny-five");
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
        console.log('Water sensor : ' + data);
    })
    console.log("WATER SENSOR OK");
}

function initFan(){
    fan = new five.Pin(arduino_conf.FAN_PIN);
    console.log("FAN OK");
}

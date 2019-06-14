const five = require("johnny-five");
const arduino_conf = require('../conf/arduino.conf');
const server_conf = require('../conf/server.conf');
const io = require('../sockets');

var waterSensor = {};

waterSensor.init = function(){
    waterSensor.pin = new five.Sensor.Digital({
        pin: arduino_conf.WATER_SENSOR_PIN,
        freq: 1000/arduino_conf.DATA_EVENT_FREQUENCY
    });
    waterSensor.value=0;
    waterSensor.pin.on('data', data=>{
        waterSensor.value = data;
        io.sockets.emit(server_conf.SOCKET_IO_EVENT_WATER_SENSOR, data);
    })

    console.log(arduino_conf.COMPONENTS_WATER_SENSOR + ' OK');
}

waterSensor.getValue = function(){
    waterSensor.value;
}

module.exports = waterSensor;
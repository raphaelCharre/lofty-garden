const five = require("johnny-five");
const arduino_conf = require('../conf/arduino.conf');

var waterSensor = {};
waterSensor.value=0;

waterSensor.init = function(){
    waterSensor.pin = new five.Pin({
        pin: arduino_conf.WATER_SENSOR_PIN
    });
    waterSensor.sensor = new five.Sensor({
        pin: arduino_conf.WATER_SENSOR_PIN,
        freq: 1000/arduino_conf.DATA_EVENT_FREQUENCY
    });
    
    waterSensor.sensor.on('data', data=>{
        waterSensor.value = data;
        waterSensor.onData(data);
    })
    console.log(arduino_conf.COMPONENTS_WATER_SENSOR + ' OK');
}

waterSensor.getValue = function(){
    waterSensor.value;
}

waterSensor.onData = function(value){}

module.exports = waterSensor;
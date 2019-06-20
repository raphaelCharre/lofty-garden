const five = require("johnny-five");
const arduino_conf = require('../conf/arduino.conf');

var lightSensor = {};
lightSensor.value=0;

lightSensor.init = function(){
    lightSensor.pin = new five.Pin({
        pin: arduino_conf.LIGHT_SENSOR_PIN
    });
    lightSensor.sensor = new five.Sensor({
        pin: arduino_conf.LIGHT_SENSOR_PIN,
        freq: 1000/arduino_conf.DATA_EVENT_FREQUENCY
    });
    
    lightSensor.sensor.on('data', data=>{
        lightSensor.value = data;
        lightSensor.onData(data);
    })
    console.log(arduino_conf.COMPONENTS_LIGHT_SENSOR + ' OK');
}

lightSensor.getValue = function(){
    lightSensor.value;
}

lightSensor.onData = function(value){}

module.exports = lightSensor;
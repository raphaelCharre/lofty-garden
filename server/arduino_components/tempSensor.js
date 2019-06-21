const five = require("johnny-five");
const arduino_conf = require('../conf/arduino.conf');

var tempSensor = {};
tempSensor.value=0;

tempSensor.init = function(){
    tempSensor.pin = new five.Pin({
        pin: arduino_conf.TEMP_SENSOR_PIN
    });
    tempSensor.sensor = new five.Sensor({
        pin: arduino_conf.TEMP_SENSOR_PIN,
        freq: 1000/arduino_conf.DATA_EVENT_FREQUENCY
    });
    
    tempSensor.sensor.on('data', data=>{
        tempSensor.value = data;
        tempSensor.onData(data);
    })
    console.log(arduino_conf.COMPONENTS_TEMPERATURE_SENSOR + ' OK');
}

tempSensor.getValue = function(){
    tempSensor.value;
}

tempSensor.onData = function(value){}

module.exports = tempSensor;
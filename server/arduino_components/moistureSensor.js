const five = require("johnny-five");
const arduino_conf = require('../conf/arduino.conf');

var moistureSensor = {};
moistureSensor.value=0;

moistureSensor.init = function(){
    moistureSensor.pin = new five.Pin({
        pin: arduino_conf.MOISTURE_SENSOR_PIN
    });
    moistureSensor.sensor = new five.Sensor({
        pin: arduino_conf.MOISTURE_SENSOR_PIN,
        freq: 1000/arduino_conf.DATA_EVENT_FREQUENCY
    });
    
    moistureSensor.sensor.on('data', data=>{
        moistureSensor.value = data;
        moistureSensor.onData(data);
    })
    console.log(arduino_conf.COMPONENTS_MOISTURE_SENSOR + ' OK');
}

moistureSensor.getValue = function(){
    moistureSensor.value;
}

moistureSensor.onData = function(value){}

module.exports = moistureSensor;
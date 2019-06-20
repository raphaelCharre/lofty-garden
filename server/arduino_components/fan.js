const five = require("johnny-five");
const arduino_conf = require('../conf/arduino.conf');

var fan = {};
fan.init = function(){
    fan.pin = new five.Pin(arduino_conf.FAN_PIN);
    fan.setValue(0);
    console.log(arduino_conf.COMPONENTS_FAN + ' OK');
}

fan.setValue = function(value){
    fan.pin.write(value);
    fan.value = value;
    fan.onChange(value);
    console.log(arduino_conf.COMPONENTS_FAN + " set to " + value);
}
fan.getValue = function(){
    fan.value;
}

fan.onChange = function(value){};

module.exports = fan;
const five = require("johnny-five");
const arduino_conf = require('../conf/arduino.conf');

var fan = {};
fan.init = function(){
    fan.pin = new five.Pin({
        pin: arduino_conf.FAN_PIN,
        value: 0
    });
    console.log(arduino_conf.COMPONENTS_FAN + ' OK');
}

fan.setValue = function(value){
    fan.pin.write(value);
    fan.onChange(value);
    console.log(arduino_conf.COMPONENTS_FAN + " set to " + value);
}
fan.getValue = function(){
    return fan.pin.value;
}

fan.onChange = function(value){};

module.exports = fan;
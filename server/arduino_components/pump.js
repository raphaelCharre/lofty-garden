const five = require("johnny-five");
const arduino_conf = require('../conf/arduino.conf');

var pump = {};
pump.init = function(){
    pump.pin = new five.Pin({
        pin: arduino_conf.PUMP_PIN,
        value: 0
    });
    console.log(arduino_conf.COMPONENTS_PUMP + ' OK');
}

pump.setValue = function(value){
    pump.pin.write(value);
    pump.onChange(value);
    console.log(arduino_conf.COMPONENTS_PUMP + " set to " + value);
}
pump.getValue = function(){
    return pump.pin.value;
}

pump.onChange = function(value){};

module.exports = pump;
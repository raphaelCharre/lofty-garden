const five = require("johnny-five");
const arduino_conf = require('../conf/arduino.conf');
const server_conf = require('../conf/server.conf');
const io = require('../sockets');

var fan = {};
fan.init = function(){
    fan.pin = new five.Pin(arduino_conf.FAN_PIN);
    fan.setValue(0);
    console.log(arduino_conf.COMPONENTS_FAN + ' OK');
}

fan.setValue = function(value){
    fan.pin.write(value);
    fan.value = value;
    io.sockets.emit(server_conf.SOCKET_IO_EVENT_FAN, value)
}
fan.isOn = function(){
    !!fan.value;
}

module.exports = fan;
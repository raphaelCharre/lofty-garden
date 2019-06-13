var arduino_conf = require('./conf/arduino.conf');
var socket_io_conf = require('./conf/socket-io.conf');

var VirtualSerialPort = require('udp-serial').SerialPort;
var firmata = require('firmata');
var five = require("johnny-five");
var sp = new VirtualSerialPort({
  host: arduino_conf.ip 
});

var io = new firmata.Board(sp);
io.once('ready', function(){
    console.log('IO Ready');
    io.isReady = true;

    var board = new five.Board({io: io, repl: true});

    board.on('ready', function(){
        console.log('five ready');
        var led = new five.Led(13);
        led.blink();
    });
});
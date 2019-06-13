var VirtualSerialPort = require('udp-serial').SerialPort;
var firmata = require('firmata');
var five = require("johnny-five");
var sp = new VirtualSerialPort({
  host: '192.168.0.110' //make sure to change the ip(use 192.168.4.1 if you are using ESP8266 as Access Point)
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
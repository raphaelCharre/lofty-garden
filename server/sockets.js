const app = require('./api');
var server = require('http').createServer(app);
const io = require('socket.io')(server);

var server_conf = require('./conf/server.conf');

io.sockets.on('connection', function (socket) {
  console.log('Connexion socket : Ok');
});

server.listen(server_conf.SOCKET_IO_PORT);

module.exports = io;
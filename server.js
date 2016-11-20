var americano = require('americano');
var io = require('socket.io')(http);

var port = process.env.PORT || 9125;
americano.start({name: 'lanza-photos', port: port});

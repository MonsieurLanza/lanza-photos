var americano = require('americano');
var io = require('socket.io');
var photoController = require('./server/controllers/photo');

var port = process.env.PORT || 9125;
americano.start({name: 'lanza-photos', port: port}, (err, app, server) => {
    server.io = io(server, {path: '/messages'});
    photoController.io = server.io;

    server.io.on('connection', function (socket) {
        // socket.emit('news', { hello: 'world' });
        socket.on('client load', function (data) {
            console.log(data);
        });
    });
});

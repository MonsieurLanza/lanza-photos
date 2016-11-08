var americano = require('americano');

var port = process.env.PORT || 9125;
americano.start({name: 'lanza-photos', port: port});

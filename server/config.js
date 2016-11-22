var americano = require('americano');
var cons = require('consolidate');
var path = require('path');

module.exports = {
    common: {
        set: {
            'view engine': 'html',
            'views': path.resolve(__dirname, 'views')
        },
        engine: {
            html: cons.mustache
        },
        use: [
            americano.bodyParser(),
            americano.methodOverride(),
            americano.static(__dirname + '/../client/public', {
                maxAge: 86400000
            })
        ],
        useAfter: [
            americano.errorHandler({
                dumpExceptions: true,
                showStack: true
            })
        ]
    },
    development: [
        americano.logger('dev')
    ],
    production: [
        americano.logger('short')
    ]
};

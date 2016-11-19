var Photo = require('../models/photo');
var consolidate = require('consolidate');
// var ReactDOMServer = require('react-dom/server');
const tus = require('../lib/vendor/tus-node-server');

const server = new tus.Server();

server.datastore = new tus.FileStore({
    // FIXME : this is kind of Hacky
    path: '\/apps/lanza-photos/uploads',
    directory: 'files'
});

server.on('EVENT_UPLOAD_COMPLETE', (event) => {
    console.log(event.file);
    Photo.createFromFile('fnuck.jpg', `${__dirname}/../../files/${event.file.id}`, (photo) => {
        console.log("Creation ended");
    });
});

// FIXME : Move this to views
function serialize(photos) {
    var html = '<ul class="photolist">';
    for (var i in photos) {
        html += `<li><a href="photos/${photos[i].id}/raw.jpg"><img src="photos/${photos[i].id}/screen.jpg" alt="${photos[i].title}" title="Photo prise le ${photos[i].date}"></a></li>`
    }
    html += '</ul>';
    return html;
}

module.exports.index = function (req, res, next) {
    Photo.list(null, function(err, photos) {
        if (err) {
            next(err);
        } else {
            if (req.accepts('text/html')) {
                res.render("index", { plop: serialize(photos) });
            }
            else if (req.accepts('application/json'))
                res.status(200).json(photos);
        }
    });
}

module.exports.fetch = function (req, res, next) {
    var options = {
        root: __dirname + '/../../client/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    Photo.find(req.params.id, function(err, photo) {
        if (err) next(err)
        else if (!photo) next(NotFound(`Photo #{id}`))
        else {
            if (req.accepts("image/*")) {
                photo.pipeFile(req.params.which || 'raw', res);
            } else if( req.accepts("application/json")) {
                res.status(200).json(photo);
            }
        }
    });
}

module.exports.tus = function( req, res ) {
    server.handle(req, res);
}

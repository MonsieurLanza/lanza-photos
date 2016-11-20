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

    // fileName comes in as metadata with following key/value pair format :
    // The Upload-Metadata request and response header MUST consist of one or more comma-separated key-value pairs.
    // The key and value MUST be separated by a space. The key MUST NOT contain spaces and commas and MUST NOT be empty.
    // The key SHOULD be ASCII encoded and the value MUST be Base64 encoded. All keys MUST be unique.
    // Ref : http://tus.io/protocols/resumable-upload.html#upload-metadata

    // FIXME: this is shorthand to get it work quickly. It may break very soon in the future.
    var split = event.file.upload_metadata.split(' ');
    var fileName = new Buffer(split[1], 'base64').toString('utf8');

    Photo.createFromFile(fileName, `${__dirname}/../../files/${event.file.id}`, (photo) => {
        console.log("Creation ended");
    });
});

// FIXME : Move this to views
function serialize(photos) {
    var html = '<ul class="flex-images">';
    for (var i in photos) {
        var size = photos[i].size.thumb;
        var width = Math.round(size.width * 300 / size.height);
        var height = 300;
        html += `<li class="photo" data-w="${width}" data-h="${height}"><a data-big="photos/${photos[i].id}/screen.jpg" href="photos/${photos[i].id}/raw.jpg" class="lightbox"><img src="photos/${photos[i].id}/thumb.jpg" alt="${photos[i].title}" title="Photo prise le ${photos[i].date}"></a></li>`
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

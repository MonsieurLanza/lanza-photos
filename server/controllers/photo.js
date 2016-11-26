const Photo = require('../models/photo');
const tus = require('../lib/vendor/tus-node-server');
const server = new tus.Server();


server.datastore = new tus.FileStore({
    // FIXME : this is kind of Hacky
    path: '\/apps/lanza-photos/uploads',
    directory: 'files'
});

server.on('EVENT_UPLOAD_COMPLETE', (event) => {
    // fileName comes in as metadata with following key/value pair format :
    // The Upload-Metadata request and response header MUST consist of one or more comma-separated key-value pairs.
    // The key and value MUST be separated by a space. The key MUST NOT contain spaces and commas and MUST NOT be empty.
    // The key SHOULD be ASCII encoded and the value MUST be Base64 encoded. All keys MUST be unique.
    // Ref : http://tus.io/protocols/resumable-upload.html#upload-metadata

    // FIXME: this is shorthand to get it work quickly. It may break very soon in the future.
    var split = event.file.upload_metadata.split(' ');
    var fileName = new Buffer(split[1], 'base64').toString('utf8');

    Photo.createFromFile(fileName, `${__dirname}/../../files/${event.file.id}`, (photo) => {
        this.io.emit('new photo', photo);
    });
});

module.exports.index = function (req, res, next) {
    Photo.list(null, function(err, photos) {
        if (err) {
            next(err);
        } else {
            if (req.accepts('text/html')) {
                res.sendFile('index.html', {root: `${__dirname}/../views/` }, function(err) {
                    if (err) console.log(err);
                });
            }
            else if (req.accepts('application/json'))
                res.status(200).json(photos);
        }
    });
};

module.exports.fetch = function (req, res, next) {
    Photo.find(req.params.id, function(err, photo) {
        if (err) next(err);
        else if (!photo) next(NotFound(`Photo ${photo.id}`));
        else {
            if (req.accepts('image/*')) {
                photo.pipeFile(req.params.which || 'raw', res);
            } else if( req.accepts('application/json')) {
                res.status(200).json(photo);
            }
        }
    });
};

module.exports.delete = function (req, res) {
    Photo.delete(req.params.id, function (err) {
        if(err) {
            console.log;
        }
        else {
            res.status('204').send();
        }
    });
};

module.exports.setIo = function(socketio) {
    this.io = socketio;
};

module.exports.tus = function( req, res ) {
    server.handle(req, res);
};

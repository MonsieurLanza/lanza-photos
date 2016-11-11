var cozydb = require('cozydb');
var File = require('../helpers/file');

var Photo = cozydb.getModel('Photo', {
    id: String,
    title: String,
    description: String,
    orientation: Number,
    binary: cozydb.NoSchema,
    _attachments: Object,
    albumid: String,
    date: String,
    gps: Object
});

Photo.prototype.pipeFile = function(which, writable) {
    request = File.download(`/data/${this.id}/binaries/${which}`, function(readable) {
        if( readable.statusCode == "200" ) {
            readable.pipe( writable );
        }
    });

    // ?? Kind of a hack I do not really get... Abort the request when response ends ?
    writable.on('close', function() { request.abort(); });
}

module.exports = Photo;

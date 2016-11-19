var cozydb = require('cozydb');
var FileHelper = require('../helpers/file');
var ImgProcessor = require('../helpers/imgProcessor');

var Photo = cozydb.getModel('Photo', {
    id: String,
    title: String,
    description: String,
    orientation: Number,
    binary: cozydb.NoSchema,
    _attachments: Object,
    albumid: String,
    date: String,
    gps: Object,
    src: String,
    thumbsrc: String,
    size: Object,
    exif: Object
});

Photo.list = function(options, callback) {
        Photo.request('all', function(err, photos) {
            if(err) {
                callback(err);
            } else {
                photos = photos.sort((a, b) => { return a.date < b.date ? 1 : -1; });
                callback(null, photos);
            }
        });
};

Photo.prototype.pipeFile = function(which, writable) {
    request = FileHelper.download(`/data/${this.id}/binaries/${this.which(which)}`, function(readable) {
        if( readable.statusCode == "200" ) {
            readable.pipe( writable );
        }
    });

    // ?? Kind of a hack I do not really get... Abort the request when response ends ?
    writable.on('close', function() { request.abort(); });
}

Photo.prototype.which = function(which) {
    var ret = which;
    if( which == 'raw' )
        if(!this.binary.raw)
            ret = 'file';

    return ret;
}

// Photo.createFromFile(fileName, filePath, callback) {
//     ImgProcessor.init(filePath, filename);
//
// }

module.exports = Photo;

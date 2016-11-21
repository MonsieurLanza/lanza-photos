var async = require('async');
var cozydb = require('cozydb');
var FileHelper = require('../helpers/file');
var fs = require('fs');
var Gps = require('../helpers/gps');
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
            if (err) {
                callback(err);
            } else {
                photos = photos.sort((a, b) => { return a.date < b.date ? 1 : -1; });
                callback(null, photos);
            }
        });
};

Photo.prototype.pipeFile = function(which, writable) {
    request = FileHelper.download(`/data/${this.id}/binaries/${this.which(which)}`, function(readable) {
        if (readable.statusCode == "200") {
            readable.pipe( writable );
        }
    });

    // ?? Kind of a hack I do not really get... Abort the request when response ends ?
    writable.on('close', function() { request.abort(); });
}

Photo.prototype.which = function(which) {
    var ret = which;
    if (which == 'raw')
        if (!this.binary.raw)
            ret = 'file';

    return ret;
}

Photo.createFromFile = function(fileName, filePath, callback) {
    var photovalues = {
        title: fileName,
        description: ''
    };

    ImgProcessor.init(filePath, fileName);
    ImgProcessor.readExifs((err, data) => {
        if (data.Properties) {
            const orientation = 'exif:Orientation';
            if(data.Properties[orientation] != 'Undefined') {
              photovalues.orientation = data.Properties[orientation];
              console.log("Orientation :" + data.Properties[orientation]);
            }
            else
                photovalues.orientation = 1;

            if(photovalues.orientation >= 5 &&
                photovalues.orientation <= 8) {
                    var tmp = data.size.width;
                    data.size.width = data.size.height;
                    data.size.height = tmp;
                }

            photovalues.exif = data.Properties;
            photovalues.gps = Gps.fromExif(data.Properties);

            // From Exif 2.2 specs :
            // DateTimeOriginal - Date of the original creation of data
            // DateTimeDigitized - Date of the digitization of data
            // DateTime - Modification date of the file
            // In case of a raw photo 3 should be the same
            // In case of a retouched photo DateTimeOriginal should be the date of the shot, DateTime the retouching date.
            // Fallback to creation date if  no exif.
            photovalues.date = data.Properties['exif:DateTimeOriginal'] || data.Properties['exif:DateTimeDigitized'] || data.Properties['exif:DateTime'] || data.Properties['date:create'];
            photovalues.size = {
                raw: data.size
            };
        }

        // FIXME: clean this mess : error handling & use async
        // TODO: erase temp files. Get sizes right.
        Photo.create(photovalues, (err, photo) => {
            photo.attachBinary(filePath, {name: 'raw', type: data['Mime type']}, (err) => {
                ImgProcessor.resize(1200, 1200, 'screen', (err) =>{
                    ImgProcessor.size((err, size) => {
                        photo.size.screen = size;
                        photo.attachBinary(filePath + 'screen.jpg', {name: 'screen', type: 'image/jpeg'}, (err)=>{
                            ImgProcessor.resize(null, 300, 'thumb', (err) => {
                                ImgProcessor.size((err, size) => {
                                    photo.size.thumb = size;
                                    photo.attachBinary(filePath + 'thumb.jpg', {name: 'thumb', type: 'image/jpeg'}, (err)=>{
                                        photo.updateAttributes({size:photo.size}, (err, photo) => {callback(photo);});

                                    });

                                    fs.unlink(filePath, logerror);
                                    fs.unlink(filePath + 'screen.jpg', logerror);
                                    fs.unlink(filePath + 'thumb.jpg', logerror);

                                    function logerror(err) {
                                      if(err) console.log(err);
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

module.exports = Photo;

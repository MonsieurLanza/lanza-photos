var gm = require('gm').subClass({imageMagick: true});

var ImgProcessor = function(path) {
    this.image = gm(path);
    this.filePath = path;
};

ImgProcessor.prototype = {
    resize: function(width, height, name, callback) {
        this.image.resize(width, height)
            .autoOrient().write(this.filePath + name + '.jpg', callback);
    },
    readExifs: function(callback) {
        this.image.identify(callback);
    },
    stream: function() {
        return this.image.stream('jpg');
    },
    size: function(callback) {
        return this.image.size(callback);
    }
};

module.exports = ImgProcessor;

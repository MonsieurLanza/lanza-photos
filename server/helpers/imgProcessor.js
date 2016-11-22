var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
var mime = require('mime');

var ImgProcessor = {
    image: null,
    filePath: null,
    init: function(path, name) {
        image = gm(path);
        filePath = path;
    },
    ensure: function() {
        if(!image) {
            console.log('You MUST call init before any other ImageProcessor operation.');
        }
        return image;
    },
    resize: function(width, height, name, callback) {
        if(!this.ensure()) return;
        image.resize(width, height)
            .autoOrient().write(filePath + name + '.jpg', callback);
    },
    readExifs: function(callback) {
        if(!this.ensure()) return null;
        image.identify(callback);
    },
    stream: function() {
        return image.stream('jpg');
    },
    size: function(callback) {
        return image.size(callback);
    }
};

module.exports = ImgProcessor;

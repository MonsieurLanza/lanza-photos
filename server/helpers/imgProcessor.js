var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
var mime = require('mime');

var ImgProcessor = {
    image: null,
    init: function(path) {
        image = gm(srcPath);
    },
    ensure: function() {
        if(!image) {
            console.log("You MUST call init before any other ImageProcessor operation");
        }
        return image;
    },
    resize: function(width, height) {
        if(!ensure()) return;
        image.resize(width, height)
            .autoorient();
    },
    readExifs: function(callback) {
        if(!ensure()) return null;
        image.identify(callback);
    }

};

module.exports = ImgProcessor;

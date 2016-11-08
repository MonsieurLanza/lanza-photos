var cozydb = require('cozydb');

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

module.exports = Photo;

var photo = require('./photo');
module.exports = {
    '': { get: photo.index },
    'uploads/*': { all: photo.tus },
    'photos/:id': { get: photo.fetch },
    'photos/:id/:which.jpg': { get: photo.fetch }
};

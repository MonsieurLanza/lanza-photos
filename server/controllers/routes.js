var photo = require('./photo');
module.exports = {
    '': { get: photo.index },
    'uploads/*': { all: photo.tus },
    'photos/:id': { get: photo.fetch, delete: photo.delete },
    'photos/:id/:which.jpg': { get: photo.fetch }
};

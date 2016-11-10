var photo = require('./photo');
module.exports = {
  '': { get: photo.index },
  'photos/:id': { get: photo.fetch }
};

Photo = require('../models/photo');

module.exports.index = function (req, res, next) {
    Photo.request('all', function(err, photos) {
        if(err) {
            console.log("Ah bénon, ça ne marche pas.")
            next(err);
        } else {
            res.status(200).json(photos)
        }
    });
};

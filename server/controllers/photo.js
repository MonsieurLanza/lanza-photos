var Photo = require('../models/photo');
var consolidate = require('consolidate');
// var ReactDOMServer = require('react-dom/server');

function serialize(photos) {
    var html = '<ul class="photolist">';
    for (var i in photos) {
        html += `<li><img src="photos/${photos[i].id}" alt="${photos[i].title}"></li>`
    }
    html += '</ul>';
    return html;
}



module.exports.index = function (req, res, next) {
    Photo.request('all', function(err, photos) {
        if(err) {
            console.log("Ah bénon, ça ne marche pas.")
            next(err);
        } else {
            if( req.accepts('text/html') ) {
                res.render("index", { plop: serialize(photos) })
            }
            else if (req.accepts('application/json'))
                res.status(200).json(photos);
        }
    });
};

module.exports.fetch = function (req, res, next) {
    var options = {
        root: __dirname + '/../../client/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    Photo.find(req.params.id, function(err, photo) {
        if (err) next(err)
        else if (!photo) next(NotFound(`Photo #{id}`))
        else {
            photo.pipeFile("thumb", res);
        }
    });
}

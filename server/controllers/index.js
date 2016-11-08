module.exports.index = function (req, res, next) {
    if( req.accepts('image/jpeg') ) {
          var options = {
            root: __dirname + '/../../client/public/',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };

        res.sendFile('/vieux.jpg', options);
    }
    else
        res.send('Good bye !');
};

var http = require('http');

module.exports = {
  download: function(path, callback) {
    var basic, id, options, pwd;
    id = process.env.NAME;
    pwd = process.env.TOKEN;
    basic = "Basic " + (new Buffer(id + ":" + pwd).toString('base64'));
    options = {
      host: 'localhost',
      port: 9101,
      path: path,
      headers: {
        Authorization: basic
      }
    };
    return http.get(options, callback);
  }
};

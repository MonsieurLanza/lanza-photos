'use strict';

const Path = require('path'); // Lanza's addition - 2016/11/18
const DataStore = require('../stores/DataStore');
const EventEmitter = require('events');


class BaseHandler extends EventEmitter {
    constructor(store) {
        super();
        if (!(store instanceof DataStore)) {
            throw new Error(`${store} is not a DataStore`);
        }
        this.store = store;
    }

    /**
     * Wrapper on http.ServerResponse.
     *
     * @param  {object} res http.ServerResponse
     * @param  {integer} status
     * @param  {object} headers
     * @param  {string} body
     * @return {ServerResponse}
     */
    send(res, status, headers, body) {
        headers = headers ? headers : {};
        body = body ? body : '';
        headers = Object.assign(headers, {
            'Content-Length': body.length,
        });

        res.writeHead(status, headers);
        res.write(body);
        return res.end();
    }

    /**
     * Extract the file id from the request
     *
     * @param  {object} req http.incomingMessage
     * @return {bool|string}
     *
     * Modified by Lanza on 2016/11/18.
     * Hack for CozyCloud's http-proxy compatibility.
     * (http-proxy 1.14 does not rewrite 201 Location headers).
     */
    getFileIdFromRequest(req) {
        const file_id = Path.basename(req.originalUrl || req.url);
        return file_id;
    }

}

module.exports = BaseHandler;

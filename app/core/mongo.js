'use strict'

const mongorito = require('mongorito'),
    util = require('util'),
    config = require('../config');

var uri = util.format(
    '%s:%s@%s:%s/%s', config.mongo_user, config.mongo_pwd,
    config.mongo_host, config.mongo_port, config.mongo_db
);

mongorito.connect(uri);

module.exports = mongorito.Model;

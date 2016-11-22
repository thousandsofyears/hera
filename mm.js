'use strict'

const fs = require('fs'),
    config = require('./app/config');

var data = {
        host: config.mongo_uri,
        port: config.mongo_port, 
        db: config.mongo_db,
        user: config.mongo_user,
        password: config.mongo_pwd,
        collection: 'mm',
        directory: './mm',
        poolSize: 4
    }

fs.writeFile('mm.json', JSON.stringify(data))

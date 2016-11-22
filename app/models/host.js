'use strict'

const Model = require('../core/mongo');

class Host extends Model {
    collection () {
        return 'host'
    }
}

module.exports = Host;


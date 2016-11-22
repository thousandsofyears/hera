'use strict'

const Model = require('../core/mongo');

class Status extends Model {
    collection () {
        return 'status'
    }
}

module.exports = Status;


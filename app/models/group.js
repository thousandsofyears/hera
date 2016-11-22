'use strict'

const Model = require('../core/mongo');

class HostGroup extends Model {
    collection () {
        return 'host_group'
    }
}

module.exports = HostGroup;

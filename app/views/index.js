'use strict'

// index.js

/**
 * Module dependencies.
 */


const MethodView = require('../core/view'),
    Blueprint = require('../core/blueprint'),
    bp_index = new Blueprint;


const indexView = new MethodView(['GET']);

indexView.get = function* (){
    this.body = 'Hello world!'
}


bp_index.add('/', indexView.as_view);

module.exports = bp_index;



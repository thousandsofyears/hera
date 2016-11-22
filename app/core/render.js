'use strict'


// render.js

/**
 * Module dependencies.
 */

const render = require('koa-swig'),
    path = require('path');

module.exports = render({
    root: path.join(__dirname, '../templates'),
    autoescape: true,
    cache: 'memory', // disable, set to false 
});

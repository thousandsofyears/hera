'use strict'


const koa = require('koa'),
    body = require('koa-better-body'),
    logger = require('koa-logger'),
    mounter = require('koa-mount'),
    statics = require('koa-static'),
    mongo = require('koa-mongo'),
    router = require('koa-router'),
    path = require('path'),
    render = require('./core/render'),
    config = require('./config'),
    app = koa(),
    r = router(app);

const bp_index = require('./views/index'),
    bp_host = require('./apis/host'),
    bp_status = require('./apis/status'),
    bp_group = require('./apis/group');

app.context.render = render;
app.context.config = config;

app
    .use(logger())
    .use(body())
    .use(mounter('/static', statics(path.join(__dirname, '../static/dist'))))
    // use r.routes at the end!!!
    .use(r.routes());


bp_index.attach(r);
bp_group.attach(r);
bp_host.attach(r);
bp_status.attach(r);

module.exports = app;

'use strict'

exports.mongo_host = process.env.MONGO_URI || '0.0.0.0';
exports.mongo_port = process.env.MONGO_URI || '27017';
exports.mongo_db = process.env.MONGO_DB || 'hera';
exports.mongo_user = process.env.MONGO_USER || 'hera';
exports.mongo_pwd = process.env.MONGO_PWD || 'hhhh';

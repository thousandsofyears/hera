'use strict'

// index.js

/**
 * Module dependencies.
 */


const mongo = require('mongodb'),
    APIView = require('../core/api'),
    Blueprint = require('../core/blueprint'),
    Status = require('../models/status'),
    bp_status = new Blueprint;



const statusAPI = new APIView();

statusAPI.post = function* (){
    var form = this.request.fields;

    if (!form){
        this.throw('No params!', 400);
    }
    
    var status = new Status({
        cpu: form.cpu,
        mem: form.mem,
        host: {
            $ref: 'host',
            $id: mongo.ObjectId(form.host_id),
        }
    })
    yield status.save()
    this.body = status;
}

bp_status.add('/apis/status', statusAPI.as_view());
module.exports = bp_status;

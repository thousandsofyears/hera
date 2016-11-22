'use strict'

// index.js

/**
 * Module dependencies.
 */


const mongo = require('mongodb'),
    APIView = require('../core/api'),
    Blueprint = require('../core/blueprint'),
    Host = require('../models/host'),
    HostGroup = require('../models/group'),
    bp_host = new Blueprint;


const hostListView = new APIView(),
    hostView = new APIView();


hostView.get = function* (){
    var query = this.request.query,
        result = yield Host.aggregate([{
            $lookup: {
                from: 'host_group', 
                localField: 'id', 
                foreignField: 'group', 
                as: 'group'
            }
        } , {
            '$match': {
                'group.name': query.group_name,
            }
        }]);
    if (result.length > 0){
        console.log(result)
        this.body = result[0];
    }
}


hostListView.post = function* (){
    var form = this.request.fields;

    if (!form){
        this.throw('No params!', 400);
    }

    var result = yield Host.aggregate([{
            $lookup: {
                from: 'host_group', 
                localField: 'id', 
                foreignField: 'group', 
                as: 'group'
            }
        } , {
            '$match': {
                name: form.name,
                'group.name': form.group_name,
            }
        }]);


    if (result.length > 0){
        this.body = result[0];
        return;
    }

    var group = yield HostGroup.findOne({name: form.group_name});

    if (!group){
        this.throw('Group not found!', 404);
    }

    var host = new Host({
        name: form.name,
        group: {
            $ref: 'host_group',
            $id: mongo.ObjectId(group._id),
        }
    })
    yield host.save();
    this.body = host;
}


hostListView.get = function* (){
    var result = yield Host.find();
    this.body = result;
}


bp_host.add('/apis/hosts', hostListView.as_view());
bp_host.add('/apis/host', hostView.as_view());

module.exports = bp_host;



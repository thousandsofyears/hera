'use strict'

// index.js

/**
 * Module dependencies.
 */


const APIView = require('../core/api'),
    Blueprint = require('../core/blueprint'),
    HostGroup = require('../models/group'),
    bp_group = new Blueprint;


const groupListView = new APIView(),
    groupView = new APIView();


groupView.get = function* (){
    var query = this.request.query,
        result = yield HostGroup.findOne({name: query.name});
    if (result){
        this.body = result.toJSON();
    } else {
        this.body = {}
    }
}


groupListView.post = function* (){
    const name = this.request.fields.name;
    var group = new HostGroup({name: name}),
        tmp = yield HostGroup.findOne({name: name});

    if (!tmp){
        yield group.save();
        this.body = group.toJSON();
    } else {
        this.body = tmp.toJSON();
    }
}


groupListView.get = function* (){
    var result = yield HostGroup.find();
    this.body = result;
}


bp_group.add('/apis/host_groups', groupListView.as_view());
bp_group.add('/apis/host_group', groupView.as_view());

module.exports = bp_group;


module.exports.id = "init";

module.exports.up = function (done) {
    // use this.db for MongoDB communication, and this.log() for logging
    this.db.createCollection('host_group');
    this.db.createCollection('host');
    done();
};

module.exports.down = function (done) {
    // use this.db for MongoDB communication, and this.log() for logging
    var host_group = this.db.collection('host_group'),
        host = this.db.collection('host');

    host_group.drop()
    host.drop()
    done();
};

'use strict'

var MethodView = require('./view')

class APIView extends MethodView {
    *dispatch(globals) {
        globals.set('Content-Type', 'application/json');
        yield super.dispatch(globals);
        if (!this.body){
            this.body = {}
        }
    }
}

module.exports = APIView;

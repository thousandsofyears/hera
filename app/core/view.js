'use strict'

class MethodView {
    constructor(methods) {
        this.methods = methods || ['GET', 'POST', 'PUT', 'POST'];
    }

    *dispatch(globals) {
        yield this[globals.method.toLowerCase()].call(globals);
    }

    as_view() {
        var view = this;

        return function *(next){
            this.view = view;
            yield view.dispatch(this); 
        }
    }
}

module.exports = MethodView;

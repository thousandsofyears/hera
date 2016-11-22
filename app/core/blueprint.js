'use strict'

function Blueprint(){
    this.url_map = new Map();

    this.add = function(url, func){
        this.url_map.set(url, func); 
    }

    this.attach = function(router){
        for(let [url, func] of this.url_map){
            // TODO: check err 
            router.all(url, func); 
        }
    }
    return this;
}

module.exports = Blueprint;

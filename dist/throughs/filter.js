"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const through_1 = require("./through");
class FilterStream extends through_1.ThroughStream {
    constructor(fn) {
        super();
        this.fn = fn;
    }
    write(data) {
        if (this.fn(data))
            this.sink.write(data);
        this.paused = this.sink.paused;
    }
}
function filter(fn) {
    return new FilterStream(fn);
}
exports.default = filter;

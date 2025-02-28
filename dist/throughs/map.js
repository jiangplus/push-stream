"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const through_1 = require("./through");
class MapStream extends through_1.ThroughStream {
    constructor(fn) {
        super();
        this.fn = fn;
    }
    write(data) {
        this.sink.write(this.fn(data));
        this.paused = this.sink.paused;
    }
}
function map(fn) {
    return new MapStream(fn);
}
exports.default = map;

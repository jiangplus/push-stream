"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const through_1 = require("./through");
class AsyncMapStream extends through_1.ThroughStream {
    constructor(fn) {
        super();
        this.async = false;
        this.fn = fn;
    }
    write(data) {
        if (this.paused)
            throw new Error('received write while paused');
        this.async = true;
        this.fn(data, (err, result) => {
            this.async = false;
            if (err)
                this.source.abort((this.ended = err));
            else {
                this.sink.write(result);
                if (this.ended)
                    this.sink.end(this.ended);
                else if (this.paused)
                    this.resume();
            }
        });
        this.paused = this.async || this.sink.paused;
    }
    end(err) {
        if (this.async)
            this.ended = err || true;
        else
            this.sink.end(err);
    }
}
function asyncMap(fn) {
    return new AsyncMapStream(fn);
}
exports.default = asyncMap;

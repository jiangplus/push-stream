"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const through_1 = require("./through");
class TakeStream extends through_1.ThroughStream {
    constructor(test, opts) {
        super();
        this._includeLast = !!(opts && opts.last);
        if (typeof test === 'number') {
            let n = test;
            this._includeLast = true;
            this.fn = () => {
                return --n > 0;
            };
        }
        else {
            this.fn = test;
        }
        this.paused = true;
        this.ended = false;
    }
    write(data) {
        const test = this.fn(data);
        if (test) {
            this.sink.write(data);
            this.paused = this.sink.paused;
        }
        else if (this._includeLast) {
            // abort immediately, so we don't stall waiting
            // for the next message just to end
            this._includeLast = false;
            this.sink.write(data);
            this.source.abort();
        }
        else
            this.source.abort();
    }
}
function take(fn, opts) {
    return new TakeStream(fn, opts);
}
exports.default = take;

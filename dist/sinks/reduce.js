"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReduceStream {
    constructor(reduce, acc, done) {
        this.paused = false;
        this._reduce = reduce;
        this._acc = acc;
        this._done = done;
    }
    write(data) {
        this._acc = this._reduce(this._acc, data);
    }
    end(err) {
        if (this._done)
            this._done(err, this._acc);
    }
    abort(err) {
        this.ended = err || true;
        this.source.abort(err);
    }
}
function reduce(reduce, accOrCb, cb) {
    if (!cb) {
        cb = accOrCb;
        accOrCb = null;
    }
    return new ReduceStream(reduce, accOrCb, cb);
}
exports.default = reduce;

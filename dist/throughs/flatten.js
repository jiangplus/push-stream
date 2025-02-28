"use strict";
/*
this one is a little bit more complicated.
because has buffering.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const through_1 = require("./through");
// T is the element type, not the array type
class FlattenStream extends through_1.ThroughStream {
    constructor() {
        super();
        this.queue = [];
    }
    write(data) {
        this.queue = data;
        this.resume();
    }
    resume() {
        var _a, _b, _c, _d, _e, _f;
        if ((_a = this.sink) === null || _a === void 0 ? void 0 : _a.paused)
            return;
        else if (!this.queue || this.queue.length == 0) {
            if (this.ended == true && !((_b = this.sink) === null || _b === void 0 ? void 0 : _b.ended))
                (_c = this.sink) === null || _c === void 0 ? void 0 : _c.end();
            this.paused = false;
            (_d = this.source) === null || _d === void 0 ? void 0 : _d.resume();
        }
        else {
            while (!((_e = this.sink) === null || _e === void 0 ? void 0 : _e.paused) && this.queue.length)
                (_f = this.sink) === null || _f === void 0 ? void 0 : _f.write(this.queue.shift());
            if (!this.queue.length) {
                this.resume();
            }
            //stay paused if we didn't write everything
            else
                this.paused = true;
        }
    }
    abort(err) {
        this.queue = []; //drop anything we were gonna write
        if (this.source)
            this.source.abort(err);
    }
    end(err) {
        //on a normal end, drain the rest of the queue
        this.ended = err || true;
        if (!err || err == true) {
            this.resume();
        }
        //on an error, end sink immediately.
        else if (err && this.sink)
            this.sink.end(err);
    }
}
function flatten() {
    return new FlattenStream();
}
exports.default = flatten;

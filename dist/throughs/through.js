"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThroughStream = void 0;
const pipeable_1 = __importDefault(require("../pipeable"));
function noop() { }
class ThroughStream extends pipeable_1.default {
    constructor(op, done) {
        super();
        this._op = op || noop;
        this._done = done || noop;
        this.paused = true;
        this.ended = false;
    }
    resume() {
        if (this.source && this.sink && !(this.paused = this.sink.paused))
            this.source.resume();
    }
    end(err) {
        this.ended = err || true;
        this._done(err === true ? null : err);
        if (this.sink)
            this.sink.end(err);
    }
    abort(err) {
        //should this check if the sink has already ended?
        this.ended = err || true;
        if (this.source)
            this.source.abort(err);
    }
    write(data) {
        this._op(data);
        if (this.sink)
            this.sink.write(data);
    }
}
exports.ThroughStream = ThroughStream;
function through(op, done) {
    return new ThroughStream(op, done);
}
exports.default = through;

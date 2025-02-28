"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pipeable_1 = __importDefault(require("../pipeable"));
class InfiniteStream extends pipeable_1.default {
    constructor() {
        super();
        this._i = 0;
        this._looping = false;
    }
    resume() {
        this._looping = true;
        while (this.sink && !this.sink.paused)
            if (this.ended) {
                this.sink.end(this.ended === true ? null : this.ended);
                break;
            }
            else
                this.sink.write(this._i++);
        this._looping = false;
    }
    abort(err) {
        this.ended = err || true;
        if (!this._looping && this.sink)
            this.resume();
    }
}
function infinite() {
    return new InfiniteStream();
}
exports.default = infinite;

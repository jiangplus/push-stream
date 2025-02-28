"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pipeable_1 = __importDefault(require("../pipeable"));
class ValueStream extends pipeable_1.default {
    constructor(values) {
        super();
        this._i = 0;
        this._values = values;
        this.paused = true;
    }
    resume() {
        var _a, _b;
        while (!((_a = this.sink) === null || _a === void 0 ? void 0 : _a.paused) &&
            !(this.ended || (this.ended = this._i >= this._values.length)))
            (_b = this.sink) === null || _b === void 0 ? void 0 : _b.write(this._values[this._i++]);
        if (this.ended && this.sink && !this.sink.ended)
            this.sink.end();
    }
    abort(err) {
        if (this.sink) {
            this.sink.end((this.ended = err || true));
        }
    }
}
function values(values) {
    return new ValueStream(values);
}
exports.default = values;

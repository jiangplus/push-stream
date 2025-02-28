"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pipe_1 = __importDefault(require("./pipe"));
class Pipeable {
    constructor() {
        this.paused = true;
        this.ended = false;
        this.pipe = pipe_1.default;
    }
    pipe(sink) {
        return pipe_1.default.call(this, sink);
    }
    resume() {
        // This should be implemented by subclasses
    }
    abort(err) {
        // This should be implemented by subclasses
    }
}
exports.default = Pipeable;

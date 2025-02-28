"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pipeable_1 = __importDefault(require("../pipeable"));
class EmptyStream extends pipeable_1.default {
    constructor() {
        super();
    }
    resume() {
        var _a;
        (_a = this.sink) === null || _a === void 0 ? void 0 : _a.end();
    }
}
function empty() {
    return new EmptyStream();
}
exports.default = empty;

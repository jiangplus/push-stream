"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduce = exports.drain = exports.collect = void 0;
const collect_1 = __importDefault(require("./collect"));
exports.collect = collect_1.default;
const drain_1 = __importDefault(require("./drain"));
exports.drain = drain_1.default;
const reduce_1 = __importDefault(require("./reduce"));
exports.reduce = reduce_1.default;

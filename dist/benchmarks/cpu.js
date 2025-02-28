"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bench = __importStar(require("micro-bmark"));
const pull = __importStar(require("pull-stream"));
const __1 = __importDefault(require("../"));
bench.run(async () => {
    const ARRAY = Array(200000).fill(0).map((_, i) => i);
    await bench.mark('pull.values', 1000, () => new Promise((resolve) => pull(pull.values(ARRAY), pull.drain(null, resolve))));
    await bench.mark('push.values', 1000, () => new Promise((resolve) => (0, __1.default)(__1.default.values(ARRAY), __1.default.drain(null, resolve))));
    await bench.mark('pull.asyncMap', 1000, () => new Promise((resolve) => pull(pull.values(ARRAY), pull.asyncMap((x, cb) => cb(null, x)), pull.drain(null, resolve))));
    await bench.mark('push.asyncMap', 1000, () => new Promise((resolve) => (0, __1.default)(__1.default.values(ARRAY), __1.default.asyncMap((x, cb) => cb(null, x)), __1.default.drain(null, resolve))));
    await bench.mark('pull.filter', 1000, () => new Promise((resolve) => pull(pull.values(ARRAY), pull.filter((x) => x % 2 === 0), pull.drain(null, resolve))));
    await bench.mark('push.filter', 1000, () => new Promise((resolve) => (0, __1.default)(__1.default.values(ARRAY), __1.default.filter((x) => x % 2 === 0), __1.default.drain(null, resolve))));
});

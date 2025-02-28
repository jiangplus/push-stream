"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
A push stream pipeline is a doublely linked list.
data (write/end) travels one way, and signals (pause/resume/abort) travels the other way.

when you pipe to a stream, if it already has a source, find the first
source and pipe to that. this makes a.pipe(b.pipe(c) work, or a.pipe(b)

also, duplex streams (which, like in pull streams, are a pair {source, sink} streams)
*/
function pipe(sink) {
    if (!sink)
        throw new Error('sink must be provided');
    let _sink = sink;
    // Find the first source in the chain
    while (sink.source)
        sink = sink.source;
    this.sink = sink;
    sink.source = this;
    if (!sink.paused)
        this.resume();
    return _sink;
}
exports.default = pipe;

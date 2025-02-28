import { Source, Sink } from './types';

/*
A push stream pipeline is a doublely linked list.
data (write/end) travels one way, and signals (pause/resume/abort) travels the other way.

when you pipe to a stream, if it already has a source, find the first
source and pipe to that. this makes a.pipe(b.pipe(c) work, or a.pipe(b)

also, duplex streams (which, like in pull streams, are a pair {source, sink} streams)
*/

function pipe<T = any, R = any>(this: Source<T>, sink: Sink<R>): Sink<R> {
  if (!sink) throw new Error('sink must be provided');
  
  let _sink = sink;
  // Find the first source in the chain
  while (sink.source) sink = sink.source as any;
  
  this.sink = sink as any;
  sink.source = this as any;
  
  if (!sink.paused) this.resume();
  return _sink;
}

export default pipe;

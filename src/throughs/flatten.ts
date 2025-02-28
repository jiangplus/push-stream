/*
this one is a little bit more complicated.
because has buffering.
*/

import { ThroughStream } from './through';

// T is the element type, not the array type
class FlattenStream<T = any> extends ThroughStream<T[]> {
  queue: T[] = [];
  source: any;
  sink?: any;

  constructor() {
    super();
  }

  write(data: T[]): void {
    this.queue = data;
    this.resume();
  }

  resume(): void {
    if (this.sink?.paused) return;
    else if (!this.queue || this.queue.length == 0) {
      if (this.ended == true && !this.sink?.ended) this.sink?.end();
      this.paused = false;
      this.source?.resume();
    } else {
      while (!this.sink?.paused && this.queue.length)
        this.sink?.write(this.queue.shift());
      if (!this.queue.length) {
        this.resume();
      }
      //stay paused if we didn't write everything
      else this.paused = true;
    }
  }

  abort(err?: Error | boolean): void {
    this.queue = []; //drop anything we were gonna write
    if (this.source) this.source.abort(err);
  }

  end(err?: Error | boolean | null): void {
    //on a normal end, drain the rest of the queue
    this.ended = err || true;
    if (!err || err == true) {
      this.resume();
    }
    //on an error, end sink immediately.
    else if (err && this.sink) this.sink.end(err);
  }
}

export default function flatten<T = any>(): FlattenStream<T> {
  return new FlattenStream<T>();
}

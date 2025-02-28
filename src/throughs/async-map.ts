import { ThroughStream } from './through';
import { Callback } from '../types';

class AsyncMapStream<T = any, R = any> extends ThroughStream<T> {
  fn: (data: T, cb: Callback<R>) => void;
  async: boolean = false;
  sink: any;
  source: any;

  constructor(fn: (data: T, cb: Callback<R>) => void) {
    super();
    this.fn = fn;
  }

  write(data: T): void {
    if (this.paused) throw new Error('received write while paused');
    this.async = true;
    
    this.fn(data, (err: Error | null, result?: R) => {
      this.async = false;
      if (err) this.source.abort((this.ended = err));
      else {
        this.sink.write(result);
        if (this.ended) this.sink.end(this.ended);
        else if (this.paused) this.resume();
      }
    });
    
    this.paused = this.async || this.sink.paused;
  }

  end(err?: Error | boolean | null): void {
    if (this.async) this.ended = err || true;
    else this.sink.end(err);
  }
}

export default function asyncMap<T = any, R = any>(
  fn: (data: T, cb: Callback<R>) => void
): AsyncMapStream<T, R> {
  return new AsyncMapStream<T, R>(fn);
}

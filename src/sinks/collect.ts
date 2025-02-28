import { Sink } from '../types';
import { Callback } from '../types';

class CollectStream<T = any> implements Sink<T> {
  paused: boolean = false;
  buffer: T[] = [];
  _cb: Callback<T[]>;
  source?: any;
  ended?: boolean | Error;

  constructor(cb: Callback<T[]>) {
    this._cb = cb;
  }

  // This is a writable so it doesn't have pipe or resume

  write(data: T): void {
    this.buffer.push(data);
  }

  end(err?: Error | boolean | null): void {
    if (err && err !== true) this._cb(err as Error, this.buffer);
    else this._cb(null, this.buffer);
  }
}

export default function collect<T = any>(cb: Callback<T[]>): CollectStream<T> {
  return new CollectStream<T>(cb);
}

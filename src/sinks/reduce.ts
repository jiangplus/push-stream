import { Sink, Callback } from '../types';

class ReduceStream<T = any, R = any> implements Sink<T> {
  paused: boolean = false;
  _reduce: (acc: R, data: T) => R;
  _acc: R;
  _done: Callback<R>;
  source: any;
  ended?: boolean | Error;

  constructor(reduce: (acc: R, data: T) => R, acc: R, done: Callback<R>) {
    this._reduce = reduce;
    this._acc = acc;
    this._done = done;
  }

  write(data: T): void {
    this._acc = this._reduce(this._acc, data);
  }

  end(err?: Error | boolean | null): void {
    if (this._done) this._done(err as Error | null, this._acc);
  }

  abort(err?: Error | boolean): void {
    this.ended = err || true;
    this.source.abort(err);
  }
}

export default function reduce<T = any, R = any>(
  reduce: (acc: R, data: T) => R, 
  acc: R, 
  cb: Callback<R>
): ReduceStream<T, R>;
export default function reduce<T = any, R = any>(
  reduce: (acc: R, data: T) => R, 
  cb: Callback<R>
): ReduceStream<T, R>;
export default function reduce<T = any, R = any>(
  reduce: (acc: R, data: T) => R, 
  accOrCb: R | Callback<R>, 
  cb?: Callback<R>
): ReduceStream<T, R> {
  if (!cb) {
    cb = accOrCb as Callback<R>;
    accOrCb = null as unknown as R;
  }
  return new ReduceStream(reduce, accOrCb as R, cb);
}

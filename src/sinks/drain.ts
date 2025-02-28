import { Sink } from '../types';

interface DrainCallback<T = any> {
  (err?: Error | null): void;
}

class DrainStream<T = any> implements Sink<T> {
  paused: boolean = false;
  _each?: (data: T) => boolean | void;
  _done?: DrainCallback;
  source: any;
  ended?: boolean | Error;

  constructor(each?: (data: T) => boolean | void, done?: DrainCallback) {
    this._each = each;
    this._done = done;
  }

  write(data: T): void {
    if (!this._each) return;
    if (this._each(data) === false) {
      this.abort();
    }
  }

  end(err?: Error | boolean | null): void {
    if (this._done) this._done(err as Error | null);
  }

  abort(err?: Error | boolean): void {
    this.ended = err || true;
    this.source.abort(err);
  }
}

export default function drain<T = any>(
  each?: (data: T) => boolean | void, 
  done?: DrainCallback
): DrainStream<T> {
  return new DrainStream<T>(each, done);
}

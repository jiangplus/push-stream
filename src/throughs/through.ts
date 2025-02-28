import Pipeable from '../pipeable';
import { Sink } from '../types';

function noop(): void {}

export class ThroughStream<T = any> extends Pipeable<T> {
  _op: (data: T) => void;
  _done: (err?: Error | null) => void;
  source: any;

  constructor(op?: (data: T) => void, done?: (err?: Error | null) => void) {
    super();
    this._op = op || noop;
    this._done = done || noop;
    this.paused = true;
    this.ended = false;
  }

  resume(): void {
    if (this.source && this.sink && !(this.paused = this.sink.paused))
      this.source.resume();
  }

  end(err?: Error | boolean | null): void {
    this.ended = err || true;
    this._done(err === true ? null : err as Error | null);
    if (this.sink) this.sink.end(err);
  }

  abort(err?: Error | boolean): void {
    //should this check if the sink has already ended?
    this.ended = err || true;
    if (this.source) this.source.abort(err);
  }

  write(data: T): void {
    this._op(data);
    if (this.sink) this.sink.write(data);
  }
}

export default function through<T = any>(
  op?: (data: T) => void, 
  done?: (err?: Error | null) => void
): ThroughStream<T> {
  return new ThroughStream<T>(op, done);
}

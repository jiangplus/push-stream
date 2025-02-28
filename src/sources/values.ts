import Pipeable from '../pipeable';
import { Sink } from '../types';

class ValueStream<T = any> extends Pipeable<T> {
  _i: number = 0;
  _values: T[];

  constructor(values: T[]) {
    super();
    this._values = values;
    this.paused = true;
  }

  resume(): void {
    while (
      !this.sink?.paused &&
      !(this.ended || (this.ended = this._i >= this._values.length))
    )
      this.sink?.write(this._values[this._i++]);

    if (this.ended && this.sink && !this.sink.ended) this.sink.end();
  }

  abort(err?: Error | boolean): void {
    if (this.sink) {
      this.sink.end((this.ended = err || true));
    }
  }
}

export default function values<T = any>(values: T[]): ValueStream<T> {
  return new ValueStream<T>(values);
}

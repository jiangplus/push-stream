import { ThroughStream } from './through';

interface TakeOptions {
  last?: boolean;
}

class TakeStream<T = any> extends ThroughStream<T> {
  fn: (data: T) => boolean;
  _includeLast: boolean;
  source: any;
  sink: any;

  constructor(test: ((data: T) => boolean) | number, opts?: TakeOptions) {
    super();
    this._includeLast = !!(opts && opts.last);

    if (typeof test === 'number') {
      let n = test;
      this._includeLast = true;
      this.fn = () => {
        return --n > 0;
      };
    } else {
      this.fn = test;
    }

    this.paused = true;
    this.ended = false;
  }

  write(data: T): void {
    const test = this.fn(data);
    if (test) {
      this.sink.write(data);
      this.paused = this.sink.paused;
    } else if (this._includeLast) {
      // abort immediately, so we don't stall waiting
      // for the next message just to end
      this._includeLast = false;
      this.sink.write(data);
      this.source.abort();
    } else this.source.abort();
  }
}

export default function take<T = any>(
  fn: ((data: T) => boolean) | number, 
  opts?: TakeOptions
): TakeStream<T> {
  return new TakeStream<T>(fn, opts);
}

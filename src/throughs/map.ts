import { ThroughStream } from './through';

class MapStream<T = any, R = any> extends ThroughStream<T> {
  fn: (data: T) => R;
  sink?: any;

  constructor(fn: (data: T) => R) {
    super();
    this.fn = fn;
  }

  write(data: T): void {
    this.sink.write(this.fn(data));
    this.paused = this.sink.paused;
  }
}

export default function map<T = any, R = any>(fn: (data: T) => R): MapStream<T, R> {
  return new MapStream<T, R>(fn);
}

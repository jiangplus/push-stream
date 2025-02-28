import { ThroughStream } from './through';

class FilterStream<T = any> extends ThroughStream<T> {
  fn: (data: T) => boolean;
  sink?: any;

  constructor(fn: (data: T) => boolean) {
    super();
    this.fn = fn;
  }

  write(data: T): void {
    if (this.fn(data)) this.sink.write(data);
    this.paused = this.sink.paused;
  }
}

export default function filter<T = any>(fn: (data: T) => boolean): FilterStream<T> {
  return new FilterStream<T>(fn);
}

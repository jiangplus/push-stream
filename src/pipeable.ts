import { Source, Sink } from './types';
import pipe from './pipe';

class Pipeable<T = any> implements Source<T> {
  paused: boolean = true;
  ended: boolean | Error = false;
  sink?: Sink<T>;

  constructor() {
    this.pipe = pipe;
  }

  pipe<R = T>(sink: Sink<R>): Sink<R> {
    return pipe.call(this, sink);
  }

  resume(): void {
    // This should be implemented by subclasses
  }

  abort(err?: Error | boolean): void {
    // This should be implemented by subclasses
  }
}

export default Pipeable;

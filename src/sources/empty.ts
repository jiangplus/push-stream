import Pipeable from '../pipeable';
import { Sink } from '../types';

class EmptyStream<T = any> extends Pipeable<T> {
  constructor() {
    super();
  }

  resume(): void {
    this.sink?.end();
  }
}

export default function empty<T = any>(): EmptyStream<T> {
  return new EmptyStream<T>();
}

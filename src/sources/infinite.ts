import Pipeable from '../pipeable';
import { Sink } from '../types';

class InfiniteStream extends Pipeable<number> {
  _i: number = 0;
  _looping: boolean = false;

  constructor() {
    super();
  }

  resume(): void {
    this._looping = true;
    while (this.sink && !this.sink.paused)
      if (this.ended) {
        this.sink.end(this.ended === true ? null : this.ended as Error);
        break;
      } else this.sink.write(this._i++);
    this._looping = false;
  }

  abort(err?: Error | boolean): void {
    this.ended = err || true;
    if (!this._looping && this.sink) this.resume();
  }
}

export default function infinite(): InfiniteStream {
  return new InfiniteStream();
}

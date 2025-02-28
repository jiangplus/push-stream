import { Source, Sink } from './types';
declare class Pipeable<T = any> implements Source<T> {
    paused: boolean;
    ended: boolean | Error;
    sink?: Sink<T>;
    constructor();
    pipe<R = T>(sink: Sink<R>): Sink<R>;
    resume(): void;
    abort(err?: Error | boolean): void;
}
export default Pipeable;

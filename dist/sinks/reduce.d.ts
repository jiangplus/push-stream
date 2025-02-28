import { Sink, Callback } from '../types';
declare class ReduceStream<T = any, R = any> implements Sink<T> {
    paused: boolean;
    _reduce: (acc: R, data: T) => R;
    _acc: R;
    _done: Callback<R>;
    source: any;
    ended?: boolean | Error;
    constructor(reduce: (acc: R, data: T) => R, acc: R, done: Callback<R>);
    write(data: T): void;
    end(err?: Error | boolean | null): void;
    abort(err?: Error | boolean): void;
}
export default function reduce<T = any, R = any>(reduce: (acc: R, data: T) => R, acc: R, cb: Callback<R>): ReduceStream<T, R>;
export default function reduce<T = any, R = any>(reduce: (acc: R, data: T) => R, cb: Callback<R>): ReduceStream<T, R>;
export {};

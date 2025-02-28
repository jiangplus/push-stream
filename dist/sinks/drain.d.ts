import { Sink } from '../types';
interface DrainCallback<T = any> {
    (err?: Error | null): void;
}
declare class DrainStream<T = any> implements Sink<T> {
    paused: boolean;
    _each?: (data: T) => boolean | void;
    _done?: DrainCallback;
    source: any;
    ended?: boolean | Error;
    constructor(each?: (data: T) => boolean | void, done?: DrainCallback);
    write(data: T): void;
    end(err?: Error | boolean | null): void;
    abort(err?: Error | boolean): void;
}
export default function drain<T = any>(each?: (data: T) => boolean | void, done?: DrainCallback): DrainStream<T>;
export {};

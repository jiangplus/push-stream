import { ThroughStream } from './through';
import { Callback } from '../types';
declare class AsyncMapStream<T = any, R = any> extends ThroughStream<T> {
    fn: (data: T, cb: Callback<R>) => void;
    async: boolean;
    sink: any;
    source: any;
    constructor(fn: (data: T, cb: Callback<R>) => void);
    write(data: T): void;
    end(err?: Error | boolean | null): void;
}
export default function asyncMap<T = any, R = any>(fn: (data: T, cb: Callback<R>) => void): AsyncMapStream<T, R>;
export {};

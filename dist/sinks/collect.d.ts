import { Sink } from '../types';
import { Callback } from '../types';
declare class CollectStream<T = any> implements Sink<T> {
    paused: boolean;
    buffer: T[];
    _cb: Callback<T[]>;
    source?: any;
    ended?: boolean | Error;
    constructor(cb: Callback<T[]>);
    write(data: T): void;
    end(err?: Error | boolean | null): void;
}
export default function collect<T = any>(cb: Callback<T[]>): CollectStream<T>;
export {};

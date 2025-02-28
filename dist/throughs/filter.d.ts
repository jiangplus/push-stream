import { ThroughStream } from './through';
declare class FilterStream<T = any> extends ThroughStream<T> {
    fn: (data: T) => boolean;
    sink?: any;
    constructor(fn: (data: T) => boolean);
    write(data: T): void;
}
export default function filter<T = any>(fn: (data: T) => boolean): FilterStream<T>;
export {};

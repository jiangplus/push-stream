import { ThroughStream } from './through';
declare class MapStream<T = any, R = any> extends ThroughStream<T> {
    fn: (data: T) => R;
    sink?: any;
    constructor(fn: (data: T) => R);
    write(data: T): void;
}
export default function map<T = any, R = any>(fn: (data: T) => R): MapStream<T, R>;
export {};

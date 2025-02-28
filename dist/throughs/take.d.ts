import { ThroughStream } from './through';
interface TakeOptions {
    last?: boolean;
}
declare class TakeStream<T = any> extends ThroughStream<T> {
    fn: (data: T) => boolean;
    _includeLast: boolean;
    source: any;
    sink: any;
    constructor(test: ((data: T) => boolean) | number, opts?: TakeOptions);
    write(data: T): void;
}
export default function take<T = any>(fn: ((data: T) => boolean) | number, opts?: TakeOptions): TakeStream<T>;
export {};

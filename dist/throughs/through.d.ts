import Pipeable from '../pipeable';
export declare class ThroughStream<T = any> extends Pipeable<T> {
    _op: (data: T) => void;
    _done: (err?: Error | null) => void;
    source: any;
    constructor(op?: (data: T) => void, done?: (err?: Error | null) => void);
    resume(): void;
    end(err?: Error | boolean | null): void;
    abort(err?: Error | boolean): void;
    write(data: T): void;
}
export default function through<T = any>(op?: (data: T) => void, done?: (err?: Error | null) => void): ThroughStream<T>;
